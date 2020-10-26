import React from 'react'
import { Div } from '@startupjs/ui'
import PlayerQuestionItem from '../PlayerQuestionItem'

import './index.styl'

const PlayerQuestions = ({ questions = [], userRole }) => {
  const playerQuestions = questions.filter(q => !q.role || q.role === userRole)
  console.info('playerQuestions', playerQuestions)

  return pug`
    Div.root
      each question, index in playerQuestions
        PlayerQuestionItem(
          key=index
          question=question
        )
            
  `
}

export default PlayerQuestions
