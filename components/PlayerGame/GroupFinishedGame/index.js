import React from 'react'
import { Div, H3 } from '@startupjs/ui'
import GroupAnswersList from '../GroupAnswersList'

import './index.styl'

const GroupFinishedGame = ({ scenario, group, playersById }) => pug`
  Div.root
    H3.title Game is finished!
    GroupAnswersList(
      scenario=scenario
      group=group
      playersById=playersById
    )
`

export default GroupFinishedGame
