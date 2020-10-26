import React, { useMemo } from 'react'
import _ from 'lodash'
import { model, observer, batch } from 'startupjs'
import { Div, Row, H3, H4, H5, Button } from '@startupjs/ui'
import PlayerQuestions from './PlayerQuestions'

import './index.styl'

const resultTextMap = {
  draw: 'Draw',
  win: 'You win',
  lost: 'You lost'
}

const PlayerGame = observer(({ userId, game, scenario, rounds }) => {
  const { questions } = scenario
  const { players } = game
  const currentRound = rounds[0]
  const previousRound = rounds[1]
  const stats = currentRound.stats
  const userPreviousRoundStats = _.get(previousRound, ['stats', userId], { totalScore: 0 })

  const actionDone = currentRound && currentRound.stats[userId]

  const userRole = useMemo(() => players.find(p => p.id === userId).role, [])

  if (!currentRound) {
    return pug`
      H3.title Game is not started!
    `
  }

  if (game.status === 'finished') {
    return pug`
      H3.title Game is finished!
    `
  }

  return pug`
    Div.root
      H3.title Round #{currentRound.round}
      if currentRound.status === 'finished'
        H4.title Round finished! #{resultTextMap[stats[userId].status]}!
      else if actionDone
        H4.title Waiting for another player!
      else
        H5.title Your turn!
        PlayerQuestions(
          questions=questions
          userRole=userRole
        )
  `
})

export default PlayerGame
