import React from 'react'
import { observer, useQuery } from 'startupjs'
import { Div } from '@startupjs/ui'
import ScenarioListItem from './ScenarioListItem'
import { useCreateGame } from './hooks'

const ScenariosList = observer(() => {
  const [gameScenarios] = useQuery('gameScenarios', { _type: { $ne: null } })
  const [handleCreate, loading] = useCreateGame()

  return pug`
    Div.root
      for scenario, index in gameScenarios
        ScenarioListItem(
          key=scenario.id
          first=index === 0
          scenario=scenario
          onCreate=handleCreate
          creating=loading
        )
  `
})

export default ScenariosList
