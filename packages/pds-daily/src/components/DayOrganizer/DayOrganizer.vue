<script lang="ts">
import { defineComponent } from 'vue'
import dayjs from 'dayjs'
const headerGen = function* () {
  yield { customHeader1: 'custom header 1' }
  yield { customHeader2: 'custom header 2' }
  yield { customHeader3: 'custom header 3' }
}

const genHeader = headerGen()

const formatMonth = (month: number) => (month > 10 ? `${month}` : `0${month}`)

const groupInWeeks = (days) => {
  const weeks = []
  const indexEnd = 6
  for (let i = 0; i + 6 <= days.length + 6; i + 6) {
    const week = days.slice(i, i + 6)
    weeks.push(week)
  }
  return weeks
}

const initDaysToWeeks = (daysInt) => {
  return Array.from({ length: daysInt }, (_, index) => {
    return index + 1
  })
}

export default defineComponent({
  name: 'DailyOrganizer',
  data() {
    return {
      currentWeeks: undefined,
      currentDayIndex: 0,
      currentMonthIndex: 0,
      currentYear: this.getCurrentYear(),
      currentDaysInMonth: 0,
    }
  },
  methods: {
    // onClick() {
    //   const headerYield = genHeader.next()
    //   fetch('http://localhost:4000/', {
    //     headers: headerYield.done ? undefined : headerYield.value,
    //   })
    // },

    setCurrentWeeks(weeks) {
      this.currentWeeks = weeks
    },
    setCurrentDaysInMonth() {
      const value = this.getCurrentDaysInMonth()
      this.currentDaysInMonth = value
      const weeks = initDaysToWeeks(value)
      this.setCurrentWeeks(weeks)
    },
    getCurrentDaysInMonth() {
      const month = formatMonth(this.currentMonthIndex + 1)
      const value = dayjs(`${this.currentYear}-${month}-01`).daysInMonth()
      return value
    },
    getCurrentYear() {
      const date = new Date()
      return date.getFullYear()
    },
    moveDayCursor() {},
    moveYearCursor(v = 1) {
      const next = this.currentYear + v
      this.currentYear = next
      this.setCurrentDaysInMonth()
    },
    moveMonthCursor(v = 1) {
      const next = this.currentMonthIndex + v
      if (v > 0) {
        this.currentMonthIndex = next === 12 ? 0 : next
      } else {
        this.currentMonthIndex = next === -1 ? 11 : next
      }
      this.setCurrentDaysInMonth()
    },
    dateByCursor() {
      return new Date()
    },
  },
})
</script>
<template>
  <div class="day-organizer-container">
    DAILY ORAGNIZER
    <!-- <button @click="onClick">header test</button> -->
    <div class="day-organizer__head">
      <span @click="moveYearCursor(-1)">{{ ` < ` }}</span>
      <span>{{ currentYear }}</span>
      <span @click="moveYearCursor()">{{ ` > ` }}</span>
      <br />
      <span @click="moveMonthCursor(-1)">{{ ` < ` }}</span>
      <span>{{ currentMonthIndex + 1 }}</span>
      <span @click="moveMonthCursor()">{{ ` > ` }}</span>
      <span>currentDaysInMonth: {{ currentDaysInMonth }}</span>
    </div>
    <div class="day-organizer__body">
      <div class="weeks-container">
        <div class="weeks-wrapper">
          <div class="week" v-for="week in currentWeeks">
            {{ week }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
