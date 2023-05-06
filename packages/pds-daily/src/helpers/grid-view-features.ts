import type { GridBase, SwitTaskItem } from '@/types'
import { _cloneDeep } from '@/utils'

export const filterParent = (data: SwitTaskItem[]) => {
  const result = []
  for (const task of data) {
    if (!task.is_sub) result.push(task)
  }
  return result
}

export interface CreateGrid<T = {}> {
  (options?: Partial<GridBase> & T): GridBase
  options?: Partial<GridBase>
  _config: any
}
export const createApplyGridItemData = (grid: GridBase[] | CreateGrid) => {
  return (item: SwitTaskItem, i: number) => {
    let _grid
    if (typeof i !== 'number')
      console.warn(
        'if `i` is not a number, by default all grid info added will be of grid[0].'
      )
    if (typeof grid === 'function') {
      _grid = grid({ i: '' + i, ...item })
    } else {
      let pickIndex =
        grid.length - 1 > i ? (grid.length - 1) % i : i % (grid.length - 1)
      if (isNaN(pickIndex)) pickIndex = 1
      _grid = _cloneDeep(grid[pickIndex])
      // debugger
      _grid.i = '' + i
    }
    return Object.assign(_cloneDeep(item), { _grid })
  }
}
