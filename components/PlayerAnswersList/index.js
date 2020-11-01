import React from 'react'
import { Div, Span, Card, H5 } from '@startupjs/ui'

import './index.styl'

const PlayerAnswersList = ({ questions = [], answers = [], playerName, role, score, totalScore }) => {
  return pug`
    Card.root
      each question, index in questions
        Div.item(
          key=index
        )
          if playerName
            H5.playerName #{playerName} (#{role})
          
          Span.item
            Span.label #{question.text}: 
            Span.value= answers[index]
            
          if score !== undefined
            Span.item
              Span.label Score: 
              Span.value= score
          if totalScore !== undefined
            Span.item
              Span.label Total score: 
              Span.value= totalScore

  `
}

export default PlayerAnswersList
