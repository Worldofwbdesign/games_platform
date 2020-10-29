import React from 'react'
import { Div, H4 } from '@startupjs/ui'
import PlayerAnswersList from 'components/PlayerAnswersList'

import './index.styl'

const GroupAnswersList = ({ scenario, rounds, groupPlayers, playersHash }) => {
  const { questions } = scenario

  return pug`
    Div.root
      each round in rounds
        Div.round(
          key=round.id
        )
          H4.title Round #{round.round}
          each userId in Object.keys(round.stats)
            - const userStats = round.stats[userId]
            - const user = groupPlayers.find(u => u.id === userId)
            - const playerQuestions = questions.filter(q => !q.role || q.role === user.role)
            Div.userAnswers(
              key=userId
            )
              PlayerAnswersList(
                questions=playerQuestions
                playerName=playersHash[userId].name
                ...userStats
              )
  `
}

export default GroupAnswersList
