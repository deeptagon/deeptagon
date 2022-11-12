/**
 * @typedef TUseSelect
 * @callback isSelected
 * @callback reset Resets selection state
 * @callback onSelectionStatusChange Callback to be called when items selection status changed
 * 
 * @param {TItemKey[]} selectedItems Current selection state
 * @callback onChange 
 * @returns {{
 *    isSelected: (id: TItemKey) => boolean
 *    reset: () => void
 *    onSelectionStatusChange: {(id: TItemKey) => (newValue: boolean) => void
 * }}
 */

export const useControlledSelect = (selectedItems, onChange, totalItems) => {
  const isSelected = (id) => selectedItems.indexOf(id) !== -1
  const reset = () => onChange([])
  const onSelectionStatusChange = (id) => (newValue) => {
    let selected = new Set(selectedItems)
    newValue
      ? selected.add(id)
      : selected.delete(id)
    selected = Array.from(selected)
    onChange(totalItems === selected.length ? [] : selected)
  }
  return { isSelected, reset, onSelectionStatusChange }
}

// import {useState} from "react"
// export const useSelect = () => {
//   const [state, setState] = useState([])
//   const isSelected = (id) => state.indexOf(id) !== -1
//   const reset = () => setState([])
//   const onSelectionStatusChange = (id) => (newValue) => {
//     const selected = new Set(state)
//     newValue ? selected.add(id) : selected.delete(id)
//     setState(Array.from(selected))
//   }
//   return [state, {isSelected, reset, onSelectionStatusChange}]
// }