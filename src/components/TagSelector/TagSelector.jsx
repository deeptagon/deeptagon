import classNames from "classnames"
import Button from "@mui/material/Button"
import "./TagSelector.css"
/**
 * @typedef {string|number} TTag
 * @typedef {Object} ITagSelectorProps
 * @property {TTag[]} options
 * @property {TTag} value
 * @property {string} className
 * @callback  onChange
 * @param {ITagSelectorProps}
 * 
 * @example
 * <TagSelector options={["Tag 1", "Tag 2"]} onChange={setValue} value={value}/>
 */
export const TagSelector = ({ options=[], value, onChange, className, ...containerProps}) => {
  const select = (option) => () => onChange && onChange(option)
  
  return <div className={classNames("TagSelector", className)} {...containerProps}>
    {options.map((option, index) =>
      <Button key={option} className={classNames("Tag", { selected: option === value })} onClick={select(option)}>
        {option}
      </Button>)}
  </div>
}