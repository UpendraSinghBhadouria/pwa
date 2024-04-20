"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

const getTimeObject = (interval: number) => {
  let min = Math.floor(interval / 60)
  let sec = Math.floor(interval - min * 60)
  return { min: min >= 0 ? min : 0, sec: sec >= 0 ? sec : 0 }
}

// Virtual delay is used to sync the timer time and actual time
// as if timer were to stop (minimize or moving away from tab)
const VIRTUAL_DELAY = 2

/**
 * Custom hook to show timer
 * @param interval time in seconds
 * @returns time and functions to reset or know the state
 */

const useTimer = (
  interval: number
): [{ min: number; sec: number }, () => void, boolean] => {
  const initialTime = useMemo(() => getTimeObject(interval), [interval])

  const [time, setTime] = useState(new Date().getTime() + interval * 1000)

  const [finalTime, setFinalTime] = useState(interval)

  const [resultTime, setResultTime] = useState(initialTime)

  const [isTimedOut, setIsTimedOut] = useState(false)

  const reset = useCallback(() => {
    setTime(new Date().getTime() + interval * 1000)
    setFinalTime(interval)
    setResultTime(initialTime)
    setIsTimedOut(false)
  }, [initialTime, interval])

  useEffect(() => {
    setIsTimedOut(finalTime <= 0)
  }, [finalTime])

  useEffect(() => {
    if (!isTimedOut) {
      const id = setTimeout(() => {
        const currTime = new Date().getTime()
        let countDownTime = time > currTime ? (time - currTime) / 1000 : 0
        if (countDownTime >= finalTime - VIRTUAL_DELAY) {
          setFinalTime((prev) => prev - 1)
        } else setFinalTime(countDownTime + VIRTUAL_DELAY)
      }, 1000)
      return () => clearTimeout(id)
    }
  })

  useEffect(() => {
    setResultTime(getTimeObject(finalTime))
  }, [finalTime])

  return [resultTime, reset, isTimedOut]
}

export default useTimer
