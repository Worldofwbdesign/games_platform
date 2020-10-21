import React, { useState, useEffect } from 'react'
import { observer } from 'startupjs'
import { Row, Span, TextInput as _TextInput } from '@startupjs/ui'

import './index.styl'

function TextInput ({
  label,
  name,
  onChangeText,
  placeholder,
  error: errorFromParent,
  value
}) {
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(errorFromParent)
  }, [errorFromParent])
  return pug`
    Row.root
      _TextInput(
        label=label
        placeholder=placeholder
        onChangeText=onChangeText
        value=value
      )
    if error
      Row.error
        Span.errorMsg
          = error
  `
}

export default observer(TextInput)
