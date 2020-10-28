import React from 'react'
import _ from 'lodash'
import { Div } from '@startupjs/ui'
import PlayerQuestionItem from '../PlayerQuestionItem'
import { useConfirm } from './hooks'

import './index.styl'

const PlayerQuestions = ({ currentRound, questions = [], userStats, userRole, userGroup }) => {
  const playerQuestions = questions.filter(q => !q.role || q.role === userRole)
  const actualQuestion = playerQuestions[currentRound.currentQuestion]
  const actualAnswer = _.get(userStats, ['answers', currentRound.currentQuestion], { text: '' })
  const [loading, handleConfirm] = useConfirm({ question, currentRound, value })

  return pug`
    Div.root
      PlayerQuestionItem(
        currentRound=currentRound
        userStats=userStats
        userGroup=userGroup
        question=actualQuestion
        answer=actualAnswer
      )
      Button.btn(
        disabled=!value || loading
        color="success"
        onPress=handleConfirm
      ) Next  
  `
}

export default PlayerQuestions
