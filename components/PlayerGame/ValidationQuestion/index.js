import React, { useState } from 'react'
import _ from 'lodash'
import { observer, useDoc } from 'startupjs'
import { Div, Alert, TextInput } from '@startupjs/ui'

import './index.styl'

const ValidationQuestion = observer(({ scenario, currentRound }) => {
  const [, $currentRound] = useDoc('rounds', currentRound.id)
  const [showAlert, setShowAlert] = useState(false)

  const onChange = text => {
    const regex = new RegExp(scenario.validationRegex)
    if (text === '' || regex.test(text)) {
      $currentRound.setEach({ validationValue: text })
    } else {
      setShowAlert(true)
    }
  }

  console.info('currentRound ValidationQuestion', currentRound)

  return pug`
    Div.root
      if (showAlert)
        Alert(
          variant='error'
          label='Invalid value'
          onClose=() => setShowAlert(false)
        )
          
      TextInput.input(
        label="Validation value"
        placeholder='Enter validation value'
        disabled=!_.isEmpty(currentRound.stats)
        value=currentRound.validationValue
        onChangeText=onChange
      )
      
  `
})

export default ValidationQuestion
