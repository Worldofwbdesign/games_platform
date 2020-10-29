import { useState } from 'react'
import { model, useSession } from 'startupjs'
import uuid from 'uuid/v4'

export const useCreateGame = () => {
  const [userId] = useSession('userId')
  const [loading, setLoading] = useState(false)

  const onCreate = async scenario => {
    try {
      setLoading(true)
      const id = uuid()

      await model.add('games', {
        id,
        scenarioId: scenario.id,
        professorId: userId,
        name: scenario.name,
        status: 'new',
        players: [],
        groups: []
      })
    } finally {
      setLoading(false)
    }
  }

  return [onCreate, loading]
}
