import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import { Icon } from "../.."

export const FilterListItem = ({isSelected, name, onChange, count=0, style}) =>
  <FormControlLabel
    className="FilterListItem"
    style={style}
    control={
      <Checkbox
        icon={<Icon icon="Check2" size={0} />}
        checkedIcon={<Icon icon="Check2" size={10} />}
        checked={isSelected}
        onChange={onChange && onCheckboxChange(onChange)}
      />
    }
    label={<>
      <div className="name">{name}</div>
      <div className="count">({count})</div>
    </>} />
    
const onCheckboxChange = (callback) => (e, value) => callback(value)