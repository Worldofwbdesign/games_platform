import { useState } from 'react'
import { model, batch, useSession } from 'startupjs'
import _ from 'lodash'

export const variableRegex = /{{([\s\S]+?)}}/g

const allGroupAnswered = (group, stats) => group.every(user => _.get(stats[user.id], 'answers'))

const parseFormula = (formula, { user, constantsHash = {}, answersHash, round }) => {
  return formula.replace(variableRegex, (match, value) => {
    const [dataStore, key] = value.trim().split('.')

    switch (dataStore) {
      case 'constants':
        return constantsHash[key] || match
      case 'answers':
        return answersHash[key] || match
      case 'other':
        if (key === 'role') return user.role
        if (key === 'round') return round
    }

    return match
  })
}
const calculateRoundResults = ({ game, currentRound, previousRound, userGroup, stats, questions, maxRounds }) => {
  const { round } = currentRound
  const finalStats = {}

  const answersByRoles = Object.entries(stats).reduce((acc, [userId, userStats]) => {
    const userRole = userGroup.players.find(u => u.id === userId).role
    return Object.assign(acc, { [userRole]: userStats.answers || [] })
  }, {})

  userGroup.players.forEach(user => {
    const previousTotalScore = _.get(previousRound, ['stats', user.id, 'totalScore'], 0)
    let score = 0
    const userQuestions = questions.filter(q => (!q.role || q.role === user.role))

    userQuestions.forEach((q, index) => {
      const { constants = [], formula } = q
      if (!formula) return

      const constantsHash = constants.reduce((acc, { key, value }) => Object.assign(acc, { [key]: value }), {})
      const answersHash = Object.entries(answersByRoles).reduce((acc, [role, answers]) => Object.assign(acc, { [role]: answers[index] }), {})

      const parsedFormula = parseFormula(formula, { user, constantsHash, answersHash, round })
      const result = eval(parsedFormula)
      score += isNaN(result) ? 0 : Number(result)
    })

    finalStats[user.id] = {
      ...stats[user.id],
      score,
      totalScore: previousTotalScore + score
    }
  })

  const promises = []

  batch(
    () => {
      promises.push(model.scope(`rounds.${currentRound.id}`).setStats(finalStats))

      if (currentRound.round < maxRounds) {
        promises.push(model.scope('rounds').add({ gameId: currentRound.gameId, groupId: userGroup.id, round: round + 1 }))
      } else {
        const gameStats = Object.entries(finalStats)
          .reduce((acc, [userId, { totalScore }]) => Object.assign(acc, { [userId]: { totalScore } }), {})

        const userGroupIndex = game.groups.findIndex(g => g.id === userGroup.id)
        const groups = [...game.groups]
        groups[userGroupIndex].status = 'finished'

        const newGameObj = {
          stats: { ...(game.stats || {}), ...gameStats },
          groups
        }

        if (groups.every(g => g.status === 'finished')) {
          newGameObj.status = 'finished'
          newGameObj.finishedAt = Date.now()
        }

        promises.push(model.setEach(`games.${currentRound.gameId}`, newGameObj))
      }
    }
  )

  return Promise.all(promises)
}

export const useConfirm = ({
  game,
  userRole,
  userGroup,
  currentRound,
  previousRound,
  questions,
  answers,
  maxRounds
}) => {
  const [userId] = useSession('userId')
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    try {
      setLoading(true)
      const { stats } = currentRound
      const newStats = { ...stats, [userId]: { answers, role: userRole } }

      if (allGroupAnswered(userGroup.players, newStats)) {
        await calculateRoundResults({ game, currentRound, previousRound, userGroup, stats: newStats, questions, maxRounds })
      } else {
        await model.scope(`rounds.${currentRound.id}`).setStats(newStats)
      }
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  return [loading, handleConfirm]
}
