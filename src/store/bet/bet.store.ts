import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { BetStore } from './bet.types'
export const betStore = create(
  persist<BetStore>(
    set => ({
      bets: [],

      addBet: newBet =>
        set(state => {
          const exists = state.bets.some(b => b.outcomeId === newBet.outcomeId)
          if (exists) return state

          return { bets: [...state.bets, newBet] }
        }),

      removeBet: outcomeId =>
        set(state => ({
          bets: state.bets.filter(b => b.outcomeId !== outcomeId)
        })),
      clearBet: () =>
        set(() => ({
          bets: []
        })),
      updateAmount: (outcomeId, amount) =>
        set(state => ({
          bets: state.bets.map(bet =>
            bet.outcomeId === outcomeId ? { ...bet, amount: amount } : bet
          )
        }))
    }),
    {
      name: 'bets',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
