import React from 'react'
import { Card, Div, H4 } from '@startupjs/ui'
import GamePlayerItem from 'components/GamePlayersList/GamePlayerItem'

import './index.styl'

const GameGroupsList = ({ groups = [], playersHash }) => {
  return pug`
    Card.root
      for group, index in groups
        Div.group(
          key=index
        )
          H4.title Group #{index + 1}
          for player, index in group
            GamePlayerItem(
              key=player.id
              player=player
              playersHash=playersHash
              first=index === 0
            )
  `
}

export default GameGroupsList
