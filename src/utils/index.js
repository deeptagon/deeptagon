import { KeyCode } from "./keyCodes"
import { toast as notify } from 'react-toastify'
import moment from "moment"
import { createElement } from "react"
import Tooltip from "@mui/material/Tooltip"
export { default as config } from "../config"
export { Router, routeTo } from "./Router"
export { useAccountImage } from "./hooks"
export {useConfirmationDialog} from "./dialog"
export { Web3Provider } from "./web3"
export { notify }
export const onKey = (key, callback) => (e) => {
  if (e.keyCode === KeyCode[key]) {
    e.stopPropagation();
    callback(e)
  }
  return e
}

export const formatDate = (date) =>
  moment(new Date(date * 1000))
    .format('DD/MM/yyyy HH:mm:ss')
export const onInputValueChange = (callback) => (e) => callback(e.target.value)
export const withParams = (Component, forceParams) =>
  ({ match: { params } }) =>
    <Component {...{ ...params, ...forceParams }} />
    export const wrapAddress = (address) => address.substring(0, 5) + '...' + address.substring(38, 42)
    export const partStr = (str, by) => {
      const arr = []
      let tmp = ''
      for (let i = 1, len = str.length; i <= len; i++) {
        tmp += str[i - 1]
        if (i % by === 0) {
          arr.push(tmp)
          tmp = ''
        }
      }
      tmp.length && arr.push(tmp)
      return arr.join(' ')
}
    
export const withTooltip = (title, children) => {
  if (title) {
    return createElement(Tooltip, { arrow: true, title }, children)
  }
  return children
}