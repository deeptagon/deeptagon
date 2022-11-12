import { useRef, useState, useEffect, useMemo } from 'react'
import { createCanvas } from 'canvas';
import { renderIcon } from '@download/blockies';

import classNames from 'classnames';
import { formatDate } from '.';
export const useInputState = (initialValue) => {
  const [value, setValue] = useState(initialValue)
  const onChange = (e) => setValue(e.target.value)
  const reset = () => setValue(initialValue)
  return { value, onChange, reset }
}
export const useMergeState = (initialValue) => {
  const [state, setState] = useState(initialValue)
  const update = (partialState) => setState({ ...state, ...partialState })
  return [state, update]
}

export const useLoadingState = () => {
  const initialState = { success: false, loading: false, failed: false }
  const [{ last, ...state }, setState] = useState({ ...initialState })
  const load = (promise) => {
    setState({ ...initialState, loading: true, last })
    const fn = promise
    return fn
      .then((data) => {
        setState({ ...initialState, success: true, last: Date.now() })
        return data
      })
      .catch(err => {
        setState({ ...initialState, failed: true, last })
        return Promise.reject(err)
      })
  }
  return [state, load, last]
}

export const useKeyStatus = ({ revoked, until }) => {
  const status = useMemo(() =>
    revoked
      ? 'revoked'
      : until < Date.now() / 1000
        ? 'expired'
        : until
          ? 'active'
          : '', [revoked, until])
  return [status, status === "active"
    ? <> until <a className='time'>{formatDate(until)}</a></>
    : <> in <a className='time'>{formatDate(status === "revoked" ? revoked : until)}</a></>]

}

const canvas = createCanvas(50, 50);
export const useAccountImage = (account) =>
  useMemo(() => {
    if (!account) return undefined
    const cached = localStorage.getItem('img:' + account)
    if (cached) return cached
    debugger
    const image = renderIcon({ seed: account.toLowerCase() }, canvas).toDataURL()
    localStorage.setItem('img:' + account, image)
    return image
  }, [account])


export const useSwitchingState = (initialState) => {
  const [state, setState] = useState(initialState)
  return [state, () => setState(true), () => setState(false), () => setState(initialState)]
}

export const useElementOffset = () => {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ height: 0, width: 0, top: 0, left: 0 })
  let o
  if (ref.current && ref.current.offsetHeight) {
    const el = ref.current
    o = { height: el.offsetHeight, width: el.offsetWidth, top: el.offsetTop, left: el.offsetLeft }
  }
  useEffect(() => {
    o && JSON.stringify(o) !== JSON.stringify(offset) && setOffset(o)
  }, [JSON.stringify(o)])
  return [offset, ref]
}
export const useTemporaryState = (initialState, reset) => {
  const [state, setState] = useState(initialState)
  useEffect(() => {

    const timeout = (state !== initialState) && setTimeout(() => setState(initialState), reset)
    return () => clearTimeout(timeout)
  }, [state])
  return [state, setState]
}
export const createTitleHook = (main) => (title) => {
  useEffect(() => {
    if (title) {
      document.title = title + " | " + main
    }
  }, [title])
}