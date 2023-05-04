import DayOrganizer from '@/components/DayOrganizer/DayOrganizer.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/day-organizer', name: 'dayOrganizer', component: DayOrganizer },
  ],
})

export default router
