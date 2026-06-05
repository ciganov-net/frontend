import { betStore } from '@/store/bet/bet.store'

export function useBet() {
  const bets = betStore(state => state.bets)
  const addBet = betStore(state => state.addBet)
  const removeBet = betStore(state => state.removeBet)
  const updateAmount = betStore(state => state.updateAmount)

  return {
    bets,
    addBet,
    removeBet,
    updateAmount
  }
}
