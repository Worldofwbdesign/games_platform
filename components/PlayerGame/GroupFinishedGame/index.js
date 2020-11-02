import React from 'react'
import { Div, H3 } from '@startupjs/ui'
import GroupAnswersList from '../GroupAnswersList'

import './index.styl'

const GroupFinishedGame = ({ scenario, group, playersHash }) => pug`
  Div.root
    H3.title Game is finished!
    GroupAnswersList(
      scenario=scenario
      group=group
      playersHash=playersHash
    )
`

export default GroupFinishedGame
