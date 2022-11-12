import { withTooltip } from "../../utils"
import IconButton from "@mui/material/IconButton"
import { Icons } from "./Icons"

export const Icon = ({ icon, color, label, onClick,...props }) => {
  const Svg = Icons[icon] || Icons.Expand
  const iconClick = (e) => {
    e.stopPropagation()
    onClick()
  }
  return withTooltip(label,
    <IconButton onClick={iconClick}{...props}>
      <Svg fill={color} />
    </IconButton>)
}