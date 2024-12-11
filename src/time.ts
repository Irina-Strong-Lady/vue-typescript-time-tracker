import { computed, ref } from 'vue'
import {
  HUNDRED_PERCENT,
  MILLISECONDS_IN_SECOND,
  SECONDS_IN_DAY,
  SECONDS_IN_HOUR
} from '@/constants'

const midnight = computed((): number => new Date(now.value).setHours(0, 0, 0, 0))

const secondsSinceMidnight = computed(
  (): number => (now.value.getTime() - midnight.value) / MILLISECONDS_IN_SECOND
)

export function today(): Date {
  return new Date()
}

export function tomorrow(): Date {
  const tomorrow = today()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow
}

export function endOfHour(date: Date): Date {
  const endOHour = new Date(date)
  endOHour.setTime(endOHour.getTime() + SECONDS_IN_HOUR * MILLISECONDS_IN_SECOND)

  endOHour.setMinutes(0, 0, 0)

  return endOHour
}

export function isToday(date: Date): boolean {
  return date.toDateString() === today().toDateString()
}

export function toSeconds(milliseconds: number): number {
  return Math.round(milliseconds / MILLISECONDS_IN_SECOND)
}

export const now = ref(today())

export const secondsSinceMidnightInPercentage = computed(
  (): number => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
)

export function startCurrentDateTimer(): void {
  setInterval((): void => {
    now.value = today()
  }, MILLISECONDS_IN_SECOND)
}
