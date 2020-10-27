import React, { useState } from 'react'
import { Div, TextInput, Select, Button } from '@startupjs/ui'
import { useConfirm } from './hooks'

import './index.styl'

const PlayerQuestionItem = ({ question, currentRound, userStats }) => {
  const { currentQuestion } = currentRound
  const { options = [] } = question
  const [value, setValue] = useState('')
  const [loading, handleConfirm] = useConfirm({ question, currentRound, value })

  return pug`
    Div.root 
      if options.length > 0
        Select.select(
          label=question.text
          placeholder='Enter answer'
          value=value
          onChange=setValue
          options=options
        )
      else
        TextInput(
          label=question.text
          placeholder='Enter answer'
          value=value
          onChangeText=setValue
        )

      Button.btn(
        disabled=!value || _.get(userStats, ['answers', currentQuestion])
        color="success"
        onPress=handleConfirm
      ) Confirm
        
  `
}

export default PlayerQuestionItem
