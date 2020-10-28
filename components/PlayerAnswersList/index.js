import React from 'react'
import { Div, Span } from '@startupjs/ui'

import './index.styl'

const PlayerAnswersList = ({ questions = [], answers = [], score }) => {
  return pug`
    Div.root
      each question, index in questions
        Div.item(
          key=index
        )
          Span.question #{question.text}:
          Span.asnwer= answers[index]
          if score !== undefined
            Span.score= score
  `
}

export default PlayerAnswersList
