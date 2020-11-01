import React from 'react'
import _ from 'lodash'
import { Div, Span } from '@startupjs/ui'

import './index.styl'

const GamePlayerItem = ({ player, playersHash, first }) => pug`
  Div.root(
    styleName=[first && 'first']
    key=player.id
  )
    Span.item
      Span.label Name: 
      Span.value= _.get(playersHash[player.id], 'name')

    Span.item
      Span.label Role: 
      Span.value= player.role
`

export default GamePlayerItem
