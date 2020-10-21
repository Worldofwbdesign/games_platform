import React from 'react'
import { observer } from 'startupjs'
import { ScrollView } from 'react-native'
import { Content } from '@startupjs/ui'
import ScenarioForm from 'components/ScenarioForm'

import './index.styl'

const PScenario = observer(({ match: { params: { scenarioId } } }) => {
  return pug`
    ScrollView.root
      Content.content
        ScenarioForm(
          scenarioId=scenarioId
        )
  `
})

export default PScenario
