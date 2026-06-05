export interface BetStore {
  bets: Bet[]
  addBet: (bet: Bet) => void
  removeBet: (outcomeId: string) => void
  updateAmount: (outcomeId: string, amount: number) => void
}

interface Bet {
  title: string
  outcomeId: string
  outcomeTitle: string
  amount: number
  coefficient: number
}
