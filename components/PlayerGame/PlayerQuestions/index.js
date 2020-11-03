import React, { useState } from 'react'
import { Div, Button } from '@startupjs/ui'
import PlayerQuestionItem from '../PlayerQuestionItem'
import { useConfirm } from './hooks'

import './index.styl'

const PlayerQuestions = props => {
  const {
    currentRound,
    playerQuestions = [],
    userStats
  } = props
  const [answers = [], setAnswers] = useState([])
  const [loading, handleConfirm] = useConfirm({ ...props, answers })

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
