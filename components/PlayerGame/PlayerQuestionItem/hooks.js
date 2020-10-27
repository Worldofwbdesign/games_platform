import { useState } from 'react'

export const useConfirm = ({ question, currentRound, value }) => {
  const [loading, setLoading] = useState(false)

  const handleConfirm = () => {
    const { stats } = currentRound
    if (_.isEmpty(stats)) {
      
    }
    const competitorAnswer = 
  }

  return [loading, handleConfirm]
}