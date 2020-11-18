import React from 'react'
import { Div, H3 } from '@startupjs/ui'
import GamePlayersList from 'components/GamePlayersList'

import './index.styl'

const PlayerGroupedGame = ({ players, playersById }) => pug`
  Div.root
    H3.title Waiting to start the game!
    Div.content
      GamePlayersList(
        players=players
        playersById=playersById
      )
`

export default PlayerGroupedGame
