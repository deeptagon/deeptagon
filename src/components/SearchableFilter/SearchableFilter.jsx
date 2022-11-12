import { useState } from "react"
import FormGroup from "@mui/material/FormGroup"
import TextField from "@mui/material/TextField"
import classNames from "classnames"
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer/AutoSizer"
import List from "react-virtualized/dist/commonjs/List/List"
import { onInputValueChange, onKey } from "../../utils"
import { useSearch } from "./utils/useSearch"
import { useControlledSelect } from "./utils/useControlledSelect"
import { FilterListItem } from "./utils/FilterListItem"
import "./SearchableFilter.css"
/**
 * @component SearchableFilter
 * @typedef {string|number} TOptionId
 * @typedef {Object} TOption
 * @property {TOptionId} id
 * @property {string|number} name
 * @property {string|number} [index]
 * @typedef {Object} ISearchableFilterCount
 * @property {number} [id]
 * @typedef {Object} ISearchableFilterProps
 * @property {TOption[]} options
 * @property {ISearchableFilterCount} counts
 * @property {number[]} value 
 * @property {number} totalCount // Count parameter of option: "All"
 * @property {string} type // Specifies the purpose of filter, will appear on search placeholder
 * @property {id} columns // specifies search scope, default:["name"]
 * @param {ISearchableFilterProps}
 * @example
 * <SearchableFilter 
 *   options={[{id: 1, name: "One"}, {id: 2, name: "Two"}]} 
 *   counts={{1: 9, 2: 3}} 
 *   onChange={setValue} 
 *   value={value} />
 */
export const SearchableFilter = ({ options = [], columns = ["name"], value = [], onChange, type, counts = {}, totalCount = 0, className, ...containerProps }) => {
  const [query, setQuery] = useState("")
  const results = useSearch(options, columns, query)

  const placeholder = ["Search", type].join(" ")
  const { isSelected, reset, onSelectionStatusChange } = useControlledSelect(value, onChange, options.length)
 
  const onSearchKeyUp = onKey("Enter", () => {
    if (results.length === 1) {
      setQuery("")
      onChange([options[results[0]].id])
    }
  })
  
  const rowRenderer = ({ index, key, style }) => {
    if (index === 0) {
      return <FilterListItem
        key={key}
        style={style}
        isSelected={!value.length}
        onChange={value.length ? reset : undefined}
        name="All"
        count={totalCount}
      />
    }
    const { id, name } = (
      query.length
        ? options[results[index - 1]] // if options have been filtered
        : options[index - 1]
    ) || {}
    return <FilterListItem
      key={key}
      style={style}
      isSelected={isSelected(id)}
      onChange={onSelectionStatusChange(id)}
      name={name}
      count={counts[id]}
    />
  }
  const length = query.length
    ? results.length // if options have been filtered
    : options.length
  
  return <div className={classNames("SearchableFilter", className)} name={type} {...containerProps}>
    <TextField
      onChange={onInputValueChange(setQuery)}
      onKeyUp={onSearchKeyUp}
      value={query}
      placeholder={placeholder}
    />
    <FormGroup className="FilterList">
      <AutoSizer>
        {({ height, width }) => (
          <List
            rowCount={length + 1}
            {...{ height, width, rowRenderer }}
            rowHeight={40}
          />
        )}
      </AutoSizer>
    </FormGroup>
  </div>
}