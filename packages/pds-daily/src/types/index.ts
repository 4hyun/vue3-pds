import type { tasksList } from '@/data/swit-tasks-list'

export type SwitTaskItem = (typeof tasksList)[number]

export type GridBase = (typeof layout)[number]
