import React from 'react'
import { observer, emit } from 'startupjs'
import { ScrollView } from 'react-native'
import { Div, Content, Button, H2 } from '@startupjs/ui'
import ScenariosList from 'components/ScenariosList'

import './index.styl'

const PScenarios = observer(() => {
  const handleAdd = () => emit('url', '/scenario/new')

  return pug`
    ScrollView.root
      Content.content
        Div.header
          H2.h2 Library
          Button.btn(
            color="success"
            onPress=handleAdd
          ) Add Scenario

        ScenariosList
  `
})

export default PScenarios
