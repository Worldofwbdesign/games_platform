import React from 'react'
import { Card } from '@startupjs/ui'
import GamePlayerItem from './GamePlayerItem'

import './index.styl'

const GamePlayersList = ({ players = [] }) => {
  return pug`
    Card.root
      for player, index in players
        GamePlayerItem(
          key=player.id
          player=player
          first=index === 0
        )
  `
}

export default GamePlayersList
