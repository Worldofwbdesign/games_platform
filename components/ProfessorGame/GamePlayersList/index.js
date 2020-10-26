import React from 'react'
import { Card } from '@startupjs/ui'
import GamePlayerItem from '../GamePlayerItem'

import './index.styl'

const GamePlayersList = ({ players = [], playersHash = {} }) => {
  console.info('players', players)
  return pug`
    Card.root
      for player, index in players
        GamePlayerItem(
          key=player.id
          player=player
          playersHash=playersHash
          first=index === 0
        )
  `
}

export default GamePlayersList
