import type { GridBase, SwitTaskItem } from '@/types'
import { _cloneDeep } from '@/utils'

export const filterParent = (data: SwitTaskItem[]) => {
  const result = []
  for (const task of data) {
    if (!task.is_sub) result.push(task)
  }
  return result
}

export const createApplyGridItemData =
  (grid: GridBase[]) => (item: SwitTaskItem, i: number) => {
    if (typeof i !== 'number')
      console.warn(
        'if `i` is not a number, by default all grid info added will be of grid[0].'
      )
    let pickIndex =
      grid.length - 1 > i ? (grid.length - 1) % i : i % (grid.length - 1)
    if (isNaN(pickIndex)) pickIndex = 1
    const _grid = _cloneDeep(grid[pickIndex])
    // debugger
    _grid.i = '' + i
    return Object.assign(_cloneDeep(item), { _grid })
  }
