import React from 'react'
import _ from 'lodash'
import { observer, batch, model } from 'startupjs'
import uuid from 'uuid/v4'
import { Div, H3, Button } from '@startupjs/ui'
import GamePlayersList from 'components/GamePlayersList'
import GameGroupsList from './GameGroupsList'
import GameResults from './GameResults'

import './index.styl'

const formGroups = (roles, players) => {
  const playersByRoles = _.groupBy(players, 'role')

  const groups = new Array(Math.floor(players.length / roles.length))
    .fill('')
    .map(() => new Array(roles.length)
      .fill('')
      .map((p, index) => roles[index] || roles[0]))

  return groups.map(roles => ({ id: uuid(), players: roles.map(role => playersByRoles[role].shift()) }))
}

const ProfessorGame = observer(({ game, $game, scenario, playersHash }) => {
  const { status, players, groups } = game
  const { roles } = scenario

  const handleCreateGroups = () => {
    const groups = formGroups(roles, players)
    const promises = []

    batch(() => {
      promises.push($game.setEach({
        status: 'grouped',
        groups,
        players: _.flatten(groups.map(g => g.players))
      }))
      promises.push(Promise.all(groups.map(group => model.add('rounds', { gameId: game.id, groupId: group.id, round: 1, stats: {} }))))
    })
  }

  const handleStartGame = () => $game.setEach({ status: 'started' })

  if (players.length < roles.length) {
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
      Div.root
        H3.title Game is finished!
        GameResults(
          scenario=scenario
          game=game
          playersHash=playersHash
        )
    `
  }
})

export default ProfessorGame
