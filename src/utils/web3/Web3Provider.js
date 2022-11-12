import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider as Provider } from '@ethersproject/providers'
function getLibrary(provider) {
  const library = new Provider(provider)
  library.pollingInterval = 12000
  return library
}
export const Web3Provider = ({ children }) =>
  <Web3ReactProvider getLibrary={getLibrary}>
    {children}
  </Web3ReactProvider>
