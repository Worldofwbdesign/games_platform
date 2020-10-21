import { useState } from 'react'
import { model } from 'startupjs'

export const useCreateGame = () => {
  const [loading, setLoading] = useState(false)

  const onCreate = async scenario => {
    try {
      setLoading(true)
      await model.add('games', { scenarioId: scenario.id, name: scenario.name })
    } finally {
      setLoading(false)
    }
  }

  return [onCreate, loading]
}
