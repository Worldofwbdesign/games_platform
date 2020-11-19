import React, { useMemo } from 'react'
import _ from 'lodash'
import { useQuery, observer, useSession } from 'startupjs'
import { Div, H3, H4, H5 } from '@startupjs/ui'
import PlayerNewGame from './PlayerNewGame'
import PlayerGroupedGame from './PlayerGroupedGame'
import GroupFinishedGame from './GroupFinishedGame'
import WaitingPlayersGame from './WaitingPlayersGame'
import PlayerQuestions from './PlayerQuestions'
import ValidationQuestion from './ValidationQuestion'

import './index.styl'

const PlayerGame = observer(({ playersById, game, scenario }) => {
  const [userId] = useSession('userId')
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

  return pug`
    Div.root
      if game.status === 'new'
        PlayerNewGame(
          userRole=userRole
        )

      else if !currentRound
        H3.title Game is not started!

      else if game.status === 'grouped'
        PlayerGroupedGame(
          players=userGroup.players
          playersById=playersById
        )

      else if userGroup.status === 'finished'
        GroupFinishedGame(
          scenario=scenario
          group=userGroup
          playersById=playersById
        )

      else if !!userStats && !!userStats.answers
        WaitingPlayersGame(
          currentRound=currentRound
          playerQuestions=playerQuestions
          userStats=userStats
        )

      else
        H3.title Round #{currentRound.round}
        if currentRound.status === 'finished'
          H4.title Round finished!
        else
          H5.title Your turn!
          if scenario.withValidation
            ValidationQuestion(
              scenario=scenario
              currentRound=currentRound
            )

          if !scenario.withValidation || currentRound.validationValue
            PlayerQuestions(
              game=game
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
