'use client'
import { createContext, RefObject, useContext, useRef, useState } from 'react'

type GameState = 'IDLE' | 'RUNNING' | 'CRASHING' | 'CRASHED' | 'CASHED_OUT'

interface CrashContextType {
  betInput: string
  setBetInput: (val: string) => void
  useBonus: boolean
  setUseBonus: (val: boolean) => void
  gameState: GameState
  setGameState: (val: GameState) => void
  gameStateRef: RefObject<GameState>
  crashControlRef: React.MutableRefObject<{
    startGame: () => void
    cashOut: () => void
  } | null>
}

const CrashContext = createContext<CrashContextType | null>(null)

export const CrashProvider = ({ children }: { children: React.ReactNode }) => {
  const [betInput, setBetInput] = useState('100')
  const [useBonus, setUseBonus] = useState(false)
  const [gameState, setGameState] = useState<GameState>('IDLE')
  const gameStateRef = useRef<GameState>('IDLE')
  const crashControlRef = useRef(null)

  return (
    <CrashContext.Provider
      value={{
        betInput,
        setBetInput,
        useBonus,
        setUseBonus,
        crashControlRef,
        gameState,
        setGameState,
        gameStateRef
      }}
    >
      {children}
    </CrashContext.Provider>
  )
}

export const useCrash = () => {
  const ctx = useContext(CrashContext)
  if (!ctx) throw new Error('useCrash must be used into CrashProvider')
  return ctx
}
