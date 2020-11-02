import React from 'react'
import { Div, H3 } from '@startupjs/ui'
import GamePlayersList from 'components/GamePlayersList'

import './index.styl'

const PlayerGroupedGame = ({ players, playersHash }) => pug`
  Div.root
    H3.title Waiting to start the game!
    Div.content
      GamePlayersList(
        players=players
        playersHash=playersHash
      )
`

export default PlayerGroupedGame
