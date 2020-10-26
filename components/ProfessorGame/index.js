import React from 'react'
import _ from 'lodash'
import { model, observer } from 'startupjs'
import { Div, H3, Button } from '@startupjs/ui'
import GamePlayersList from './GamePlayersList'
import GameGroupsList from './GameGroupsList'
import { GAME_PLAYERS_SIZE } from '../constants'

import './index.styl'

const formGroups = (roles, players) => {
  const playersByRoles = _.groupBy(players, 'role')

  const groups = new Array(Math.floor(players.length / GAME_PLAYERS_SIZE))
    .fill('')
    .map(() => new Array(GAME_PLAYERS_SIZE)
      .fill('')
      .map((p, index) => roles[index] || roles[0]))

  return groups.map(roles => roles.map(role => playersByRoles[role].shift()))
}

const ProfessorGame = observer(({ game, $game, scenario, rounds, playersHash }) => {
  const { status, players, groups } = game
  const { roles } = scenario
  const currentRound = rounds[0]
  const stats = currentRound.stats

  const handleCreateGroups = () => {
    const groups = formGroups(roles, players)
    console.info('groups', groups)
    $game.setEach({
      status: 'grouped',
      groups,
      players: _.flatten(groups)
    })
  }

  const handleNext = async () => model.add('rounds', { gameId: game.id, round: currentRound.round + 1, stats: {} })

  const handleStartGame = () => $game.setEach({ status: 'started' })

  const handleFinish = async () => $game.setEach({
    status: 'finished',
    stats: {}
  })

  if (players.length < GAME_PLAYERS_SIZE) {
    return pug`
      H3.title Waiting for players
    `
  }

  if (game.status === 'new') {
    return pug`
      Div.root
        Button.btn(
          disabled=players.length < 2
          color="success"
          onPress=handleCreateGroups
        ) Create groups
        H3.title Joined players
        Div.gamePlayersList
          GamePlayersList(
            players=players
            playersHash=playersHash
          )
    `
  }

  if (status === 'grouped') {
    return pug`
      Div.root
        H3.title Groupes are formed!
        Button.btn(
          disabled=players.length < 2
          color="success"
          onPress=handleStartGame
        ) Start Game
        GameGroupsList(
          groups=groups
          playersHash=playersHash
        )
    `
  }

  if (status === 'started') {
    return pug`
      Div.root
        H3.title Game started!
    `
  }

  if (game.status === 'finished') {
    return pug`
      H3.title Game is finished!
    `
  }

  return pug`
    Div.root
      H3.title Round #{currentRound.round}

      Div.actions
        Button.btn(
          disabled=currentRound.status !== 'finished'
          color="warning"
          onPress=handleFinish
        ) Finish game

        Button.btn(
          disabled=currentRound.status !== 'finished'
          color="success"
          onPress=handleNext
        ) Next Round

  `
})

export default ProfessorGame
