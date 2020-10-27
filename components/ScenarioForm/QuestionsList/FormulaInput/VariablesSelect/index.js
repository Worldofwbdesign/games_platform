import React from 'react'
import { Div, Span, Button } from '@startupjs/ui'

import './index.styl'

const VariablesSelect = ({ variables, onSelect }) => {
  return pug`
    Div.root
      Span.title Choose variables
      for variable in variables
        Button.btn(
          key=variable.key
          variant="text"
          onPress=() => onSelect('variables.' + variable.key)
        )= variable.key

  `
}

export default VariablesSelect
