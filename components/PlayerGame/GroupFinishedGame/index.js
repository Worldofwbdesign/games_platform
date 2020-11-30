import React from 'react'
import { observer, useLocal, useSession } from 'startupjs'
import { Div, H3 } from '@startupjs/ui'
import GroupAnswersList from '../GroupAnswersList'

import './index.styl'

const GroupFinishedGame = observer(({ scenario, group }) => {
  const [gameId] = useLocal('$render.params.gameId')
  const [playersById] = useSession(`playersById.${gameId}`)

  return pug`
    Div.root
      H3.title Game is finished!
      GroupAnswersList(
        scenario=scenario
        group=group
        playersById=playersById
      )
  `
})

export default GroupFinishedGame
