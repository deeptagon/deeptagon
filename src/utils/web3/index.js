export { Chainlist, supportedChainIds } from './chains'
export {contractRequester, getPublicContract, getSignerContract} from "./contract"
export {Web3Provider} from "./Web3Provider"


export const bindContract = (contract, API) => {
  Object.keys(API).forEach(endpoint => {
    const method = API[endpoint]
    API[endpoint] = (chain, ...args) =>
      contract[chain]
        .then((e) => method(e, ...args))
  })
  window.API = API
  return API
}
