import { NetworkConnector } from '@web3-react/network-connector'
import { InjectedConnector } from '@web3-react/injected-connector'
import { URLS, supportedChainIds } from './chains'

export const network = new NetworkConnector({
  urls: URLS,
  defaultChainId: supportedChainIds[0]
})
export const injected = new InjectedConnector({ supportedChainIds })