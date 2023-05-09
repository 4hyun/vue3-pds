type DialogId = string
type DialogValue = boolean
interface Dialog {}

const _dialogs = {}

export const useGlobalDialogs = () => {
  const dialogs: Record<DialogId, DialogValue> = {}
  const setDialog = (id: DialogId, value: DialogValue = true) => {
    dialogs[id] = value
  }
  const register = (dialog: Dialog) => {
    _dialogs[dialog.id] = dialog
  }
  return [dialogs, { setDialog, register }]
}
