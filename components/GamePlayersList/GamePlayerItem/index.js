import React from 'react'
import _ from 'lodash'
import { observer, useLocal, useSession } from 'startupjs'
import { Div, Span } from '@startupjs/ui'

import './index.styl'

const GamePlayerItem = observer(({ player, first }) => {
  const [gameId] = useLocal('$render.params.gameId')
  const [playersById = {}] = useSession(`playersById.${gameId}`)

  return pug`
    Div.root(
      styleName=[first && 'first']
      key=player.id
    )
      Span.item
        Span.label Name: 
        Span.value= _.get(playersById[player.id], 'name')

      Span.item
        Span.label Role: 
        Span.value= player.role
  `
})

export default GamePlayerItem
