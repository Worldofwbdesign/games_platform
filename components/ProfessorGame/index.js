import React from 'react'
import _ from 'lodash'
import { observer, batch, model, useLocal, useDoc } from 'startupjs'
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

const ProfessorGame = observer(({ scenario }) => {
  const [gameId] = useLocal('$render.params.gameId')
  const [game, $game] = useDoc('games', gameId)
  const { status, players, groups } = game
  const { roles } = scenario

  const handleCreateGroups = async () => {
    const groups = formGroups(roles, players)
    const promises = []

    batch(() => {
      promises.push($game.setEach({
        status: 'grouped',
        groups,
        players: _.flatten(groups.map(g => g.players))
      }))
      groups.forEach(group => {
        const groupId = group.id
        promises.push(model.scope('rounds').add({ gameId: game.id, groupId, round: 1 }))
        promises.push(model.scope('chats').addNew('group', { groupId, userIds: group.players.map(p => p.id) }))
      })
    })

    await Promise.all(promises)
  }

  const handleStartGame = () => $game.setEach({ status: 'started', startedAt: Date.now() })

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
        )
    `
  }

  return pug`
    Div.root
      if game.status === 'started'
        H3.title Game started!
      else
        H3.title Game is finished!
        
      GameResults(
        scenario=scenario
        gameId=game.id
      )
    `
})

export default ProfessorGame
