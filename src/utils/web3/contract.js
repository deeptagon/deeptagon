import { Web3Provider } from '@ethersproject/providers'
import { injected, network } from './connectors'
import { notify } from '../../utils'
import { Contract } from 'ethers'
import { CHAINS } from './chains'

export const getPublicContract = (chainId, abi) => {
  network.changeChainId(chainId)
  return network
    .activate()
    .then((net) => new Contract(CHAINS[chainId].contractAddress, abi, new Web3Provider(net.provider)))
    .catch(e => console.log(e))
}

export const contractRequester = (signer) =>
  (method, ...args) =>
    signer.then(c => c[method](...args))
      .then((response) => {
        notify.success('Transaction is waiting for confirmations')
        return response.wait()
      })
      .catch(err => {
        notify.error(err.data
          ? err.data.message
          : err.message || err.description)
        return Promise.reject()
      })

export const getSignerContract = (address, abi, chainId) =>
  injected
    .activate(chainId)
    .then((inj) =>
      new Contract(
        CHAINS[chainId].contractAddress,
        abi,
        (new Web3Provider(inj.provider))
          .getSigner(address)
      ))