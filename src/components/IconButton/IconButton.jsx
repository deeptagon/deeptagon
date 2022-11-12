import { Tooltip } from '@mui/material'
import classNames from 'classnames'
import { Icon } from '../Icon/Icon'

export const IconButton = ({ icon, alt, size, className, tooltipPlacement="bottom", ...props }) =>
  <Tooltip arrow title={alt} place={tooltipPlacement}>
    <button className={classNames("IconButton", className)} {...props}>
      <Icon icon={icon} size={size} />
    </button>
  </Tooltip>