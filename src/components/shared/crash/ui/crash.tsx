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

  const VIEW_WIDTH = 872
  const VIEW_HEIGHT = 320

  const START_X = 40
  const START_Y = VIEW_HEIGHT - 30
  const getYByMultiplier = (value: number) =>
    START_Y - Math.min(VIEW_HEIGHT, Math.pow(Math.abs(value - 1.0), 0.75) * 35)

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

  const rocketOffset = 80
  const rocketSmoothing = 0.12

  const [rocketAngle, setRocketAngle] = useState<number>(rocketOffset)
  const rocketAngleRef = useRef<number>(rocketOffset)

  const characterPositionRef = useRef({
    x: START_X,
    y: START_Y
  })

  const normalizeAngle = (from: number, to: number) => {
    const delta = ((to - from + 540) % 360) - 180
    return from + delta
  }

  const updateCharacterPosition = (nextX: number, nextY: number) => {
    const prev = characterPositionRef.current

    const dx = nextX - prev.x
    const dy = nextY - prev.y

    if (Math.hypot(dx, dy) > 0.5) {
      const targetAngle = (Math.atan2(dy, dx) * 180) / Math.PI + rocketOffset
      const normalizedTarget = normalizeAngle(rocketAngleRef.current, targetAngle)

      const nextAngle =
        rocketAngleRef.current +
        (normalizedTarget - rocketAngleRef.current) * rocketSmoothing

      rocketAngleRef.current = nextAngle
      setRocketAngle(nextAngle)
    }

    characterPositionRef.current = {
      x: nextX,
      y: nextY
    }

    setCharacterX(nextX)
    setCharacterY(nextY)
  }

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
            //@ts-ignore
            crashPointRef.current = coefficient
            startTimeRef.current = performance.now()

            setSvgPath(`M ${START_X} ${START_Y}`)
            characterPositionRef.current = {
              x: START_X,
              y: START_Y
            }
            setCharacterX(START_X)
            setCharacterY(START_Y)
            rocketAngleRef.current = rocketOffset
            setRocketAngle(rocketOffset)

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
      updateCharacterPosition(currentX, currentY)
      setSvgPath(prev => `${prev} L ${currentX} ${currentY}`)
      requestRef.current = requestAnimationFrame(updateGame)
      return
    }

    if (gameStateRef.current !== 'RUNNING') return

    const elapsed = (time - startTimeRef.current) / 1000
    const growthSpeed = 0.4

    const baseGrowth = 1.0 + (Math.exp(elapsed * 0.28) - 1) * growthSpeed
    const visualMultiplier = Math.max(1.0, baseGrowth)
    const currentMultiplier = +visualMultiplier.toFixed(2)

    multiplierRef.current = currentMultiplier
    setMultiplier(currentMultiplier)

    if (currentMultiplier >= crashPointRef.current) {
      gameStateRef.current = 'CRASHING'
      setGameState('CRASHING')
      requestRef.current = requestAnimationFrame(updateGame)
      return
    }

    const currentX = START_X + Math.min(VIEW_WIDTH, elapsed * 55)
    const currentY = getYByMultiplier(visualMultiplier)

    updateCharacterPosition(currentX, currentY)
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
    characterPositionRef.current = {
      x: START_X,
      y: START_Y
    }
    setCharacterX(START_X)
    setCharacterY(START_Y)
    rocketAngleRef.current = rocketOffset
    setRocketAngle(rocketOffset)
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
    <section className='flex w-full flex-col gap-6'>
      <h2 className='typo-h2 text-[var(--neutral-0)]'>
        Краш
      </h2>

      <div
        className='relative h-[384px] w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--brand-100)] p-8'
        style={{
          background:
            'linear-gradient(0deg, rgba(17, 19, 24, 0.4), rgba(17, 19, 24, 0.4)), url("/crash-bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
      {gameState === 'CASHED_OUT' && winAmount > 0 && (
        <div className='pointer-events-none absolute left-1/2 top-[150px] z-30 flex -translate-x-1/2 flex-col items-center rounded-[var(--radius-md)] border border-[var(--brand-200)] bg-[rgba(17,19,24,0.72)] px-6 py-4 text-center backdrop-blur [box-shadow:0_0_12px_rgba(228,189,78,0.35)]'>
          <p className='typo-xsmall text-[var(--neutral-0)]'>
            НЕВОЗМОЖНО... ВЫ ВЫИГРАЛИ!!!
          </p>

          <p className='typo-h4 mt-1 text-[var(--brand-200)] [text-shadow:0_0_18px_rgba(228,189,78,0.25)]'>
            +{winAmount.toLocaleString('ru-RU')} ₽
          </p>

          <p className='typo-2xsmall mt-1 text-[var(--neutral-400)]'>
            Коэффициент ставки: {cashedOutMultiplier.toFixed(2)}x
          </p>
        </div>
      )}

      <svg
        width={VIEW_WIDTH}
        height={VIEW_HEIGHT}
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        className='absolute left-8 top-8 z-20 h-[320px] w-[calc(100%-64px)] select-none overflow-visible'
      >
        <defs>
          <filter id='crashGlow' x='-20%' y='-20%' width='140%' height='140%'>
            <feGaussianBlur stdDeviation='4' result='blur' />
            <feMerge>
              <feMergeNode in='blur' />
              <feMergeNode in='SourceGraphic' />
            </feMerge>
          </filter>
        </defs>

        <path
          d={svgPath}
          fill='none'
          stroke='var(--brand-200)'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          filter='url(#crashGlow)'
        />

        <g transform={`translate(${characterX}, ${characterY}) rotate(${rocketAngle})`}>
          <image
            href='/rocket.png'
            width='72'
            height='72'
            x='-36'
            y='-72'
          />
        </g>
      </svg>

      <div className='pointer-events-none absolute left-1/2 top-16 z-30 flex -translate-x-1/2 flex-col items-center'>
        {gameState === 'CRASHED' ? (
          <span className='typo-h2 text-destructive [text-shadow:0_0_18px_rgba(246,64,64,0.25)]'>
            0.00x
          </span>
        ) : (
          <span className='typo-h2 tabular-nums text-[var(--brand-200)] [text-shadow:0_0_18px_rgba(228,189,78,0.25)]'>
            {multiplier.toFixed(2)}x
          </span>
        )}

        <span className='typo-2xsmall text-[var(--neutral-0)]'>
          текущий выигрыш
        </span>
      </div>
    </div>
  </section>
)
}
