import config from './config.json'
import avaxIcon from './icons/avax.svg'
const { CHAINS } = config

export const Chainlist = {
  43112: { name: "Digiathon Testnet", icon: avaxIcon }
}
export const supportedChainIds = Object.keys(CHAINS).map(Number)
export const URLS = Object.values(CHAINS)
  .reduce((accumulator, { chainId, urls }) => {
    urls.length && (accumulator[Number(chainId)] = urls)

    return accumulator
  },
    {})


export { CHAINS }