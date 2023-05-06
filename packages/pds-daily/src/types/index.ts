import type { tasksList } from '@/data/swit-tasks-list'
import type gridLayout from '@/data/grid-mock-simple'

export type SwitTaskItem = (typeof tasksList)[number]

export type GridBase = (typeof gridLayout)[number]
