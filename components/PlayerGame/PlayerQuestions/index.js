import React from 'react'
import _ from 'lodash'
import { Div } from '@startupjs/ui'
import PlayerQuestionItem from '../PlayerQuestionItem'

import './index.styl'

const PlayerQuestions = ({ currentRound, questions = [], userStats, userRole }) => {
  const playerQuestions = questions.filter(q => !q.role || q.role === userRole)
  const actualQuestion = playerQuestions[currentRound.currentQuestion]
  const actualAnswer = _.get(userStats, ['answers', currentRound.currentQuestion], { text: '' })

  return pug`
    Div.root
      PlayerQuestionItem(
        currentRound=currentRound
        userStats=userStats
        question=actualQuestion
        answer=actualAnswer
      )     
  `
}

export default PlayerQuestions
