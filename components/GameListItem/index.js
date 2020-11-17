import React from 'react'
import { Div, Span, Card, Button } from '@startupjs/ui'
import { observer, emit, useSession, model } from 'startupjs'
import { formatDate } from '../helpers'

import './index.styl'

const GameListItem = observer(({ first, game }) => {
  const [userId] = useSession('userId')
  const [user] = useSession('user')
  const { _id, name, professorName, players = [], status, scenario: { roles }, _m: { ctime } } = game

  const handleJoin = async () => {
    if (!user.isProfessor && status === 'new' && !players.find(player => player.id === user.id)) {
      await model.scope('games').joinGame({ userId, gameId: _id, roles })
    }
    emit('url', `/game/${_id}`)
  }

  return pug`
    Card.root(
      styleName=[first && 'first']
    )
      Div.stats
        Div.item
          Span.item__key Game: 
          Span.item__label= name

        Div.item
          Span.item__key Pofessor: 
          Span.item__label= professorName

        Div.item
          Span.item__key Created: 
          Span.item__label= formatDate(ctime)

        Div.item
          Span.item__key Players: 
          Span.item__label= players.length

      Div.actions
        Button(
          onPress=handleJoin
          color="success"
        ) Join

  `
})

export default GameListItem
