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
        scenarioId: scenario.id,
        professorId: userId,
        name: scenario.name,
        players: [],
        groups: scenario.roles.reduce((acc, role) => Object.assign(acc, { [role]: [] }), {})
      })
      await model.add('rounds', { gameId: id, round: 1, stats: {} })
    } finally {
      setLoading(false)
    }
  }

  return [onCreate, loading]
}
