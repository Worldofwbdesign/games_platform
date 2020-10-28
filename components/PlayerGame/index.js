import React, { useMemo } from 'react'
import _ from 'lodash'
import { model, observer, batch } from 'startupjs'
import { Div, Row, H3, H4, H5, Button } from '@startupjs/ui'
import PlayerQuestions from './PlayerQuestions'
import GamePlayersList from 'components/GamePlayersList'

import './index.styl'

const resultTextMap = {
  draw: 'Draw',
  win: 'You win',
  lost: 'You lost'
}

const PlayerGame = observer(({ userId, playersHash, game, scenario, rounds }) => {
  const { questions } = scenario
  const { players } = game
  const currentRound = rounds[0]
  const stats = currentRound.stats
  const userStats = currentRound.stats[userId]
  const userRole = useMemo(() => players.find(p => p.id === userId).role, [players])
  const userGroup = useMemo(() => game.groups.find(group => group.find(user => user.id === userId)), [game.groups])

  if (!currentRound) {
    return pug`
      H3.title Game is not started!
    `
  }

  if (game.status === 'new') {
    return pug`
      Div.root
        H3.title Waiting for group formation!
        H4.title Your role - #{userRole}
    `
  }

  if (game.status === 'grouped') {
    return pug`
      Div.root
        H3.title Waiting to start the game!
        Div.content
          GamePlayersList(
            players=userGroup
            playersHash=playersHash
          )
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
      else if !!userStats
        H4.title Waiting for another player!
      else
        H5.title Your turn!
        PlayerQuestions(
          questions=questions
          currentRound=currentRound
          userStats=userStats
          userRole=userRole
          userGroup=userGroup
        )
  `
})

export default PlayerGame
