import React from 'react'
import _ from 'lodash'
import { observer, useDoc, useSession, useQuery } from 'startupjs'
import { ScrollView } from 'react-native'
import { Content, Div, H2, H4 } from '@startupjs/ui'
import PlayerGame from 'components/PlayerGame'
import ProfessorGame from 'components/ProfessorGame'
// import GameChronology from 'components/GameChronology'

import './index.styl'

const PGame = observer(props => {
  const { match: { params: { gameId } } } = props
  const [userId] = useSession('userId')
  const [user] = useSession('user')
  const [game, $game] = useDoc('games', gameId)
  const [scenario] = useDoc('gameScenarios', game.scenarioId)
  const [rounds] = useQuery('rounds', { gameId: game && game.id, $sort: { round: -1 }, $limit: 2 })
  const [players] = useQuery('users', { _id: { $in: _.get(game, 'players', []).map(p => p.id) } })
  const playersHash = _.keyBy(players, 'id')

  console.info('rounds', rounds)

  if (!game) {
    return pug`
      H2.h2 Game not found!
    `
  }

  if (!scenario) {
    return pug`
      H2.h2 Scenario for game not found!
    `
  }

  return pug`
    ScrollView.root
      Content
        H2.h2= game.name
        if user.isProfessor
          ProfessorGame(
            userId=userId
            game=game
            $game=$game
            scenario=scenario
            rounds=rounds
            playersHash=playersHash
          )
        else 
          PlayerGame(
            userId=userId
            game=game
            $game=$game
            scenario=scenario
            rounds=rounds
            playersHash=playersHash
          )

        // Div.chronologyWrapp
        //   H4 Game chronology

        //   GameChronology(
        //     gameId=game.id
        //     playersHash=playersHash
        //   )
  `
})

export default PGame
