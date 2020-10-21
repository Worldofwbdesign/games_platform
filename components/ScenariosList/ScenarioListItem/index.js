import React from 'react'
import { emit } from 'startupjs'
import { Card, Div, Button, Span } from '@startupjs/ui'

import './index.styl'

const ScenarioListItem = ({ scenario, first, onCreate, creating }) => {
  const { id, name, description } = scenario

  const handlePressCard = () => emit('url', `/scenario/${id}`)

  return pug`
    Card.root(
      styleName=[first && 'first']
      onPress=handlePressCard
    )
      Div.info
        Span.name= name
        Span.descr= description
      
      Button(
        color="primary"
        onPress=() => onCreate(scenario)
        disabled=creating
      ) Create
  `
}

export default ScenarioListItem
