import { config, notify } from '../../utils'
import { supportedChainIds } from './chains'
import { useWeb3React } from '@web3-react/core'
import { useState, useEffect } from 'react'
export const addChainToMetamask = (chainId) => (forward) => {
  if (window.ethereum && window.ethereum.chainId != '0x' + chainId.toString(16)) {
    return window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [getAddChainParameters(chainId)]
    })
      .then(() => forward)
      .catch((error) => {
        error.code === 4001 && notify.error("You should add chain configuration to your wallet")
        return Promise.reject(error)
      })
  }
  return forward
}
const getAddChainParameters = (chainId) => {
  const { name: chainName, urls: rpcUrls, nativeCurrency, blockExplorerUrls } = config.CHAINS[chainId]

  return {
    chainId: '0x' + chainId.toString(16),
    chainName, nativeCurrency, rpcUrls, blockExplorerUrls
  }
}

export const useChainId = () => {
  const { chainId } = useWeb3React()
  const [state, setState] = useState(localStorage.getItem("activeChain") || supportedChainIds[0])
  const activate = (id) => {
    setState(id)
    localStorage.setItem("activeChain", id)
  }
  const change = async (id) => {
    id = Number(id);
    (id != state) && switchMetamaskChain(id).then(() => activate(id))
  }
  useEffect(() => {
    chainId && change(chainId)
  }, [chainId])
  return [state, change]
}


const switchMetamaskChain = (id) =>
  !window.ethereum
    ? Promise.resolve()
    : window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x" + id.toString(16) }]
    })
      .catch(e => {
        return (e.code == 4902) ? addChainToMetamask(id)() : Promise.reject(e)
      })
