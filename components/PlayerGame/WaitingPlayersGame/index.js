import React from 'react'
import { model, observer, useSession } from 'startupjs'
import { Div, H4, H5, Button } from '@startupjs/ui'
import PlayerAnswersList from 'components/PlayerAnswersList'

import './index.styl'

const WaitingPlayersGame = observer(({ currentRound, playerQuestions, userStats }) => {
  const [userId] = useSession('userId')
  const $round = model.at(`rounds.${currentRound.id}`)

  const handleCancel = () => $round.clearRoundStats(userId)

  return pug`
    Div.root
      H4.title Waiting for other players
      H5.title Your answers:
      Div.answers
        PlayerAnswersList(
          questions=playerQuestions
          answers=userStats.answers
        )
      Button.btn(
        color='error'
        onPress=handleCancel
      ) Cancel
  `
})

export default WaitingPlayersGame
