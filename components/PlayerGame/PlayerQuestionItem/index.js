import React, { useState } from 'react'
import { Div, TextInput, Select } from '@startupjs/ui'

import './index.styl'

const PlayerQuestionItem = ({ question }) => {
  const { options = [] } = question
  const [value, setValue] = useState('')

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
        
  `
}

export default PlayerQuestionItem
