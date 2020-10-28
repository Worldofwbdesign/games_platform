import { useState } from 'react'
import _ from 'lodash'

const allGroupAnswered = (group, currentRound) => group.every(user => {
  const userStats = _.get(currentRound.stats, [userId])
})

export const useConfirm = ({ question, currentRound, value }) => {
  const [loading, setLoading] = useState(false)

  const handleConfirm = () => {
    const { stats } = currentRound
  }

  return [loading, handleConfirm]
}
