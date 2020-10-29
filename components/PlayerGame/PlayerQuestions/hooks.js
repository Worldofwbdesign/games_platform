import { useState } from 'react'
import { model, batch } from 'startupjs'
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
const calculateRoundResults = ({ currentRound, previousRound, userGroup, stats, questions }) => {
  const { round } = currentRound
  const finalStats = {}

  const answersByRoles = Object.entries(stats).reduce((acc, [userId, userStats]) => {
    const userRole = userGroup.find(u => u.id === userId).role
    return Object.assign(acc, { [userRole]: userStats.answers || [] })
  }, {})

  userGroup.forEach(user => {
    const previousTotalScore = _.get(previousRound, ['stats', user.id, 'totalScore'], 0)
    let score = 0
    const userQuestions = questions.filter(q => (!q.role || q.role === user.role))

    userQuestions.forEach((q, index) => {
      const { constants = [], formula } = q
      if (!formula) return

      const constantsHash = constants.reduce((acc, { key, value }) => Object.assign(acc, { [key]: value }), {})
      const answersHash = Object.entries(answersByRoles).reduce((acc, [role, answers]) => Object.assign(acc, { [role]: answers[index] }), {})

      const parsedFormula = parseFormula(formula, { user, constantsHash, answersHash, round })
      console.info('parsedFormula', parsedFormula)
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
      promises.push(
        model.set(`rounds.${currentRound.id}.stats`, finalStats),
        model.add('rounds', { gameId: currentRound.gameId, round: round + 1, stats: {} })
      )
    }
  )

  return Promise.all(promises)
}

export const useConfirm = ({ userId, currentRound, previousRound, questions, answers, userGroup }) => {
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    try {
      setLoading(true)
      const { stats } = currentRound
      const newStats = { ...stats, [userId]: { answers } }

      if (allGroupAnswered(userGroup, newStats)) {
        await calculateRoundResults({ currentRound, userGroup, stats: newStats, questions })
      } else {
        await model.set(`rounds.${currentRound.id}.stats`, newStats)
      }
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  return [loading, handleConfirm]
}
