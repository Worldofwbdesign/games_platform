import { useState } from 'react'
import { model, useSession, batchModel } from 'startupjs'
import uuid from 'uuid/v4'

export const useCreateGame = () => {
  const [userId] = useSession('userId')
  const [loading, setLoading] = useState(false)

  const onCreate = async scenario => {
    try {
      setLoading(true)
      const promises = []
      const id = uuid()

      batchModel(() => {
        promises.push(model.add('games', {
          id,
          scenarioId: scenario.id,
          professorId: userId,
          name: scenario.name,
          status: 'new',
          players: [],
          groups: []
        }),
        model.add('rounds', { gameId: id, round: 1, stats: {} }))
      })

      await Promise.all(promises)
    } finally {
      setLoading(false)
    }
  }

  return [onCreate, loading]
}
