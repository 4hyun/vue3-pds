import { ref } from 'vue'

export const useSelection = () => {
  const selected = ref<string[]>([])
  const select = (id: string) => {
    if (selected.value.includes(id)) return
    selected.value = selected.value.concat(id)
  }
  const selectAll = (values: string[]) => {
    selected.value = values
  }
  const deselect = (id: string) => {
    selected.value = selected.value.filter((v) => v !== id)
  }
  const deselectAll = () => {
    selected.value = []
  }
  return { selected, select, selectAll, deselect, deselectAll }
}
