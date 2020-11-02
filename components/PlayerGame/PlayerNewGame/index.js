import React from 'react'
import { Div, H3, H4 } from '@startupjs/ui'

import './index.styl'

const PlayerNewGame = ({ userRole }) => pug`
  Div.root
    H3.title Waiting for group formation!
    H4.title Your role - #{userRole}
`

export default PlayerNewGame
