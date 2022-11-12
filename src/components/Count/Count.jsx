import classNames from "classnames"
import { useMemo } from "react"
import { IconButton } from ".."
import "./Count.css"
/**
 * @component Count
 * @typedef {Object} ICountProps
 * @property {string} name Name of element to be added/removed (for tooltip)
 * @property {number} value Current value
 * @callback onChange Callback
 * @param {ICountProps}
 */
export const Count = ({name, value=0, onChange, className, ...containerProps}) => {
  const { increment, decrement, removeIcon } = useMemo(() => ({
      increment: () => onChange(value + 1),
      decrement: () => value > 0 && onChange(value - 1),
      removeIcon: value === 1
        ? "Remove"
        : "Minus"  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [value])

  
  return <div className={classNames("Count", className)} {...containerProps}>
    {value > 0 && <>
      <IconButton icon={removeIcon} size={12} alt={`Remove "${name}"`} onClick={decrement} />
      <div className="value"> {value} </div>
    </>}
    <IconButton icon="Plus" size={12} alt={`Add "${name}"`} onClick={increment}/>
  </div>
}