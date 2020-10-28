import React, { useState } from 'react'
import _ from 'lodash'
import { Div, Button } from '@startupjs/ui'
import PlayerQuestionItem from '../PlayerQuestionItem'
import { useConfirm } from './hooks'

import './index.styl'

const PlayerQuestions = ({ userId, currentRound, questions = [], playerQuestions = [], userStats, userRole, userGroup }) => {
  const [answers = [], setAnswers] = useState([])
  const [loading, handleConfirm] = useConfirm({ userId, currentRound, answers, userGroup, questions })

  console.info('answers', answers)

  const onAnswerChange = index => text => {
    const newAnswers = [...answers]
    newAnswers[index] = text
    setAnswers(newAnswers)
  }

  return pug`
    Div.root
      each question, index in playerQuestions
        PlayerQuestionItem(
          key=index
          currentRound=currentRound
          userStats=userStats
          userGroup=userGroup
          question=question
          value=answers[index]
          onAnswerChange=onAnswerChange(index)
        )

      Button.btn(
        disabled=loading
        color="success"
        onPress=handleConfirm
      ) Next  
  `
}

export default PlayerQuestions
