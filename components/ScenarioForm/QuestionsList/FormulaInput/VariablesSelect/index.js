import React from 'react'
import { Div, Span, Button } from '@startupjs/ui'
import { HARDCODED_VARIABLES } from 'components/constants'

import './index.styl'

const VariablesSelect = ({ constants = [], roles = [], onSelect }) => {
  return pug`
    Div.root
      Span.title Choose variables
      for constant in constants
        Button.btn(
          key=constant.key
          variant="text"
          onPress=() => onSelect('constants.' + constant.key)
        )= constant.key

      for role in roles
        Button.btn(
          key=role
          variant="text"
          onPress=() => onSelect('answers.' + role)
        ) #{role} answer

      for harcodedVar in HARDCODED_VARIABLES
        Button.btn(
          key=harcodedVar
          variant="text"
          onPress=() => onSelect('other.' + harcodedVar)
        )= harcodedVar

  `
}

export default VariablesSelect
