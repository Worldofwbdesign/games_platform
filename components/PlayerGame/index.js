import React, { useMemo } from 'react'
import _ from 'lodash'
import { useQuery, model, observer } from 'startupjs'
import { Div, H3, H4, H5, Button } from '@startupjs/ui'
import PlayerQuestions from './PlayerQuestions'
import GamePlayersList from 'components/GamePlayersList'
import PlayerAnswersList from 'components/PlayerAnswersList'
import GroupAnswersList from 'components/GroupAnswersList'

import './index.styl'

const resultTextMap = {
  draw: 'Draw',
  win: 'You win',
  lost: 'You lost'
}

const PlayerGame = observer(({ userId, playersHash, game, scenario }) => {
  const { questions, maxRounds } = scenario
  const { players } = game
  const userRole = useMemo(() => players.find(p => p.id === userId).role, [players])
  const playerQuestions = useMemo(() => questions.filter(q => !q.role || q.role === userRole), [])
  const userGroup = useMemo(() => game.groups.find(group => group.players.find(user => user.id === userId)), [game.groups])

  const [rounds = []] = useQuery('rounds', { gameId: game && game.id, groupId: userGroup && userGroup.id, $sort: { round: -1 }, $limit: 2 })
  const currentRound = rounds[0]
  const previousRound = rounds[1]
  const stats = _.get(currentRound, 'stats', {})
  const userStats = stats[userId]

  const handleCancel = () => model.del(`rounds.${currentRound.id}.stats.${userId}.answers`)

  if (!currentRound) {
    return pug`
      H3.title Game is not started!
    `
  }

  if (game.status === 'new') {
    return pug`
      Div.root
        H3.title Waiting for group formation!
        H4.title Your role - #{userRole}
    `
  }

  if (game.status === 'grouped') {
    return pug`
      Div.root
        H3.title Waiting to start the game!
        Div.content
          GamePlayersList(
            players=userGroup.players
            playersHash=playersHash
          )
    `
  }

  if (game.status === 'finished') {
    return pug`
      H3.title Game is finished!
        GroupAnswersList(
          scenario=scenario
          rounds=rounds
          groupPlayers=userGroup.players
          playersHash=playersHash
        )
    `
  }

  if (!!userStats && !!userStats.answers) {
    return pug`
      Div.root
        H4.title Waiting for other players
        H5.title Your answers:
        Div.answers
          PlayerAnswersList(
            questions=playerQuestions
            answers=userStats.answers
          )
        Button.btn(
          color='error'
          onPress=handleCancel
        ) Cancel
    `
  }

  return pug`
    Div.root
      H3.title Round #{currentRound.round}
      if currentRound.status === 'finished'
        H4.title Round finished! #{resultTextMap[stats[userId].status]}!
      else
        H5.title Your turn!
        PlayerQuestions(
          userId=userId
          questions=questions
          playerQuestions=playerQuestions
          currentRound=currentRound
          previousRound=previousRound
          userStats=userStats
          userRole=userRole
          userGroup=userGroup
          maxRounds=maxRounds
        )
  `
})

export default PlayerGame
