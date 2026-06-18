'use client'

import { useState, useEffect, useRef } from 'react'
import { useAddTransaction } from '@/api/hooks/useAddTransaction'
import { useGenerateCoefficient } from '@/api/hooks/useGenerateCoefficient'
import { useCrash } from '@/contexts/crash-context'

export const Crash = () => {
  const {
    betInput,
    crashControlRef,
    setBetInput,
    setUseBonus,
    gameStateRef,
    useBonus,
    gameState,
    setGameState
  } = useCrash()

  const { mutate: addTransaction } = useAddTransaction()
  const {
    data: coefficient,
    isLoading,
    refetch: updateRoundCoef
  } = useGenerateCoefficient()

  const VIEW_WIDTH = 880
  const VIEW_HEIGHT = 400

  const START_X = 40
  const START_Y = VIEW_HEIGHT - 30

  const [multiplier, setMultiplier] = useState<number>(1.0)
  const [winAmount, setWinAmount] = useState<number>(0)
  const [cashedOutMultiplier, setCashedOutMultiplier] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)
  const requestRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const crashPointRef = useRef<number>(0)
  const multiplierRef = useRef<number>(1.0)

  const [characterX, setCharacterX] = useState<number>(START_X)
  const [characterY, setCharacterY] = useState<number>(START_Y)

  const [svgPath, setSvgPath] = useState<string>(`M ${START_X} ${START_Y}`)

  const startGame = () => {
    updateRoundCoef()
    setError(null)
    const bet = parseFloat(betInput)

    if (isNaN(bet) || bet < 10) {
      setError('Минимальная сумма ставки — 10 ₽')
      return
    }

    addTransaction(
      {
        amount: bet,
        type: useBonus ? 6 : 2,
        multiplier: 1,
        eventId: '0'
      },
      {
        onError: (error: any) => {
          setError(error?.response?.data?.message || 'Недостаточно средств!')
        },
        onSuccess: () => {
          if (coefficient != undefined) {
            crashPointRef.current = coefficient
            startTimeRef.current = performance.now()

            setSvgPath(`M ${START_X} ${START_Y}`)
            setCharacterX(START_X)
            setCharacterY(START_Y)

            multiplierRef.current = 1.0
            setMultiplier(1.0)

            setWinAmount(0)

            gameStateRef.current = 'RUNNING'
            setGameState('RUNNING')

            requestRef.current = requestAnimationFrame(updateGame)
          } else {
            setError('Ошибка при генерации коэффициента!')
          }
        }
      }
    )
  }

  const updateGame = (time: number) => {
    if (!startTimeRef.current) return

    if (gameStateRef.current === 'CRASHING') {
      const dropStep = 0.04
      let nextMultiplier = +(multiplierRef.current - dropStep).toFixed(2)

      const elapsed = (performance.now() - startTimeRef.current) / 1000
      const currentX = START_X + Math.min(VIEW_WIDTH, elapsed * 55)
      const currentY =
        START_Y -
        Math.min(
          VIEW_HEIGHT,
          Math.pow(Math.abs(nextMultiplier - 1.0), 0.75) * 35
        )

      if (nextMultiplier <= 0) {
        gameStateRef.current = 'CRASHED'
        setGameState('CRASHED')

        addTransaction(
          {
            amount: parseFloat(betInput),
            type: 4,
            multiplier: 1.0,
            eventId: '0'
          },
          {
            onError: (error: any) => {
              setError(
                error?.response?.data?.message ||
                  'Недостаточно средств для выплаты выйгрыша (извините)!'
              )
            }
          }
        )

        setWinAmount(0)
        setMultiplier(0.0)
        if (requestRef.current) cancelAnimationFrame(requestRef.current)
        return
      }

      multiplierRef.current = nextMultiplier
      setMultiplier(nextMultiplier)
      setCharacterX(currentX)
      setCharacterY(currentY)
      setSvgPath(prev => `${prev} L ${currentX} ${currentY}`)
      requestRef.current = requestAnimationFrame(updateGame)
      return
    }

    if (gameStateRef.current !== 'RUNNING') return

    const elapsed = (time - startTimeRef.current) / 1000
    const growthSpeed = 0.4

    const baseGrowth = 1.0 + (Math.exp(elapsed * 0.28) - 1) * growthSpeed
    let currentMultiplier = +baseGrowth.toFixed(2)

    if (currentMultiplier < 1.0) currentMultiplier = 1.0

    multiplierRef.current = currentMultiplier
    setMultiplier(currentMultiplier)

    if (currentMultiplier >= crashPointRef.current) {
      gameStateRef.current = 'CRASHING'
      setGameState('CRASHING')
      requestRef.current = requestAnimationFrame(updateGame)
      return
    }

    const currentX = START_X + Math.min(VIEW_WIDTH, elapsed * 55)
    const currentY =
      START_Y -
      Math.min(
        VIEW_HEIGHT,
        Math.pow(Math.abs(currentMultiplier - 1.0), 0.75) * 35
      )

    setCharacterX(currentX)
    setCharacterY(currentY)
    setSvgPath(prev => `${prev} L ${currentX} ${currentY}`)

    requestRef.current = requestAnimationFrame(updateGame)
  }

  const cashOut = () => {
    if (
      gameStateRef.current !== 'RUNNING' &&
      gameStateRef.current !== 'CRASHING'
    )
      return

    const finalMultiplier = multiplierRef.current
    setCashedOutMultiplier(finalMultiplier)

    gameStateRef.current = 'CASHED_OUT'
    setGameState('CASHED_OUT')

    addTransaction(
      {
        amount: parseFloat(betInput),
        type: 3,
        multiplier: +finalMultiplier.toFixed(2),
        eventId: '0'
      },
      {
        onError: (error: any) => {
          setError(
            error?.response?.data?.message ||
              'Недостаточно средств для выплаты выйгрыша (извините)!'
          )
          setWinAmount(0)
        },
        onSuccess: () => {
          setWinAmount(Math.ceil(parseFloat(betInput) * finalMultiplier))
        }
      }
    )

    if (requestRef.current) cancelAnimationFrame(requestRef.current)
  }

  const resetGame = () => {
    gameStateRef.current = 'IDLE'
    setGameState('IDLE')

    multiplierRef.current = 1.0
    setMultiplier(1.0)

    setWinAmount(0)
    setCashedOutMultiplier(0)
    setBetInput('0')
    setError(null)

    crashPointRef.current = 0
    startTimeRef.current = null

    setSvgPath(`M ${START_X} ${START_Y}`)
    setCharacterX(START_X)
    setCharacterY(START_Y)
  }

  useEffect(() => {
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [])

  useEffect(() => {
    crashControlRef.current = {
      startGame: startGame,
      cashOut: cashOut
    }
  }, [startGame, cashOut, crashControlRef])

  return (
    <div className='flex items-center justify-center p-6 text-foreground min-h-[550px]'>
      <div
        className={`w-full max-w-4xl rounded-xl h-auto border border-border bg-card p-6 shadow-md`}
      >
        <div className='mb-4 space-y-1 text-center'>
          <h2 className='text-2xl font-bold tracking-tight text-primary-foreground'>
            КРАШ
          </h2>
          <p className='text-sm text-muted-foreground'>
            САМАЯ ЧЕСТНАЯ МИНИ-ИГРА
          </p>
        </div>

        <div
          style={{ height: `${VIEW_HEIGHT}px` }}
          className='relative mb-6 h-full w-full overflow-hidden rounded-lg bg-muted border border-border flex items-center justify-center'
        >
          <svg
            width={`${VIEW_WIDTH}`}
            height={`${VIEW_HEIGHT}`}
            className='absolute inset-0 w-full h-full select-none'
          >
            <defs>
              <filter id='glow' x='-20%' y='-20%' width='140%' height='140%'>
                <feGaussianBlur stdDeviation='4' result='blur' />
                <feMerge>
                  <feMergeNode in='blur' />
                  <feMergeNode in='SourceGraphic' />
                </feMerge>
              </filter>

              <pattern
                id='grid-pattern'
                width='40'
                height='30'
                patternUnits='userSpaceOnUse'
              >
                <path
                  d='M 40 0 L 40 30 M 0 30 L 40 30'
                  fill='none'
                  stroke='rgba(255, 255, 255, 0.05)'
                  strokeWidth='1'
                />
              </pattern>
            </defs>

            <rect width='100%' height='100%' fill='url(#grid-pattern)' />

            <path
              d={svgPath}
              fill='none'
              strokeWidth='4'
              strokeLinecap='round'
              strokeLinejoin='round'
              filter='url(#glow)'
              stroke={
                gameState === 'CRASHING' || gameState === 'CRASHED'
                  ? 'oklch(0.577 0.245 27.325)'
                  : 'oklch(0.852 0.199 91.936)'
              }
            />

            <g
              transform={`translate(${characterX}, ${characterY}) ${gameState === 'CRASHING' ? `rotate(${(performance.now() * 0.4) % 360})` : ''}`}
              className={
                gameState === 'CRASHING' || gameState === 'CRASHED'
                  ? 'text-destructive'
                  : 'text-foreground'
              }
            >
              <g className={gameState === 'RUNNING' ? 'animate-pulse' : ''}>
                <image
                  href='/coin.png'
                  width='32'
                  height='32'
                  x='-16'
                  y='-16'
                />
              </g>
            </g>
          </svg>

          <div className='absolute top-4 right-6 pointer-events-none select-none text-right'>
            {gameState === 'CRASHED' ? (
              <span className='text-4xl font-black text-destructive animate-bounce block'>
                0.00x
              </span>
            ) : (
              <span
                className={`text-5xl font-black tabular-nums tracking-tighter transition-all duration-75 ${
                  gameState === 'CRASHING'
                    ? 'text-destructive'
                    : 'text-secondary-foreground opacity-90'
                }`}
              >
                {multiplier.toFixed(2)}x
              </span>
            )}
          </div>
        </div>

        <div className='space-y-4'>
          {gameState === 'CASHED_OUT' && (
            <div className='rounded-lg bg-primary/20 border border-primary p-4 text-center text-primary-foreground animate-fade-in'>
              <p className='text-sm font-medium'>
                НЕВОЗМОЖНО... ВЫ ВЫЙГРАЛИ!!!
              </p>
              <p className='text-3xl font-extrabold mt-1'>+{winAmount} ₽</p>
              <p className='text-xs text-muted-foreground mt-1'>
                Коэффициент ставки: {cashedOutMultiplier}x
              </p>
            </div>
          )}

          {/* {gameState === 'IDLE' && (
            <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-2 rounded-lg bg-card p-3 border border-border/60 shadow-sm w-full'>
              <div className='flex items-center space-x-2 bg-muted/40 px-3 py-2 rounded-md border border-border/40 select-none shrink-0'>
                <input
                  id='bonus-checkbox'
                  type='checkbox'
                  checked={useBonus}
                  onChange={e => setUseBonus(e.target.checked)}
                  className='h-4 w-4 rounded border-input bg-background text-primary focus:ring-2 focus:ring-primary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                />
                <label
                  htmlFor='bonus-checkbox'
                  className='text-xs font-semibold uppercase tracking-wider text-muted-foreground cursor-pointer disabled:opacity-50'
                >
                  БОНУСЫ
                </label>
              </div> */}
          {/* 
              <div className='relative flex-1'>
                <label className='text-sm font-medium text-muted-foreground'>
                  Ваша ставка (₽)
                </label>
                <input
                  type='number'
                  disabled={false}
                  value={betInput}
                  onChange={e => setBetInput(e.target.value)}
                  className={`h-10 w-full rounded-md border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${
                    error
                      ? 'border-destructive focus-visible:ring-destructive'
                      : 'border-input'
                  }`}
                  placeholder='Введите сумму...'
                  min='0'
                />
                {error && (
                  <p className='text-xs font-medium text-destructive mt-1 animate-slide-down'>
                    {error}
                  </p>
                )}
              </div>
            </div>
          )} */}

          {gameState === 'RUNNING' ? (
            <button
              onClick={cashOut}
              className='inline-flex h-12 w-full items-center justify-center rounded-md bg-secondary px-4 text-base font-bold text-secondary-foreground shadow-sm hover:opacity-90 cursor-pointer active:scale-[0.98] transition-transform'
            >
              ЗАБРАТЬ ДЕНЬГИ
            </button>
          ) : gameState === 'IDLE' ? (
            <button
              onClick={startGame}
              className='inline-flex h-12 w-full items-center justify-center rounded-md bg-primary px-4 text-base font-bold text-primary-foreground shadow-sm hover:opacity-90 cursor-pointer active:scale-[0.98] transition-transform'
            >
              ПРОЕБАТЬ ДЕНЬГИ
            </button>
          ) : gameState === 'CRASHING' ? (
            <button
              disabled={true}
              className='disabled inline-flex h-12 w-full items-center justify-center rounded-md bg-secondary px-4 text-base font-bold text-secondary-foreground shadow-sm hover:opacity-90 cursor-pointer active:scale-[0.98] transition-transform'
            >
              Не получилось, не фортануло...
            </button>
          ) : (
            <button
              onClick={resetGame}
              className='inline-flex h-12 w-full items-center justify-center rounded-md bg-primary px-4 text-base font-bold text-primary-foreground shadow-sm hover:opacity-90 cursor-pointer active:scale-[0.98] transition-transform'
            >
              СНОВА ПРОЕБАТЬ ДЕНЬГИ
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
