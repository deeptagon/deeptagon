import classNames from 'classnames'
import { useWeb3React } from '@web3-react/core'
import { useEffect } from 'react'
import { Icons } from '..'
import { routeTo, wrapAddress, useAccountImage, useConfirmationDialog, config } from '../../utils'
import './Account.css'
import { connect } from 'react-redux'
import { injected } from '../../utils/web3/connectors'
import Button from '@mui/material/Button'

export const Account = ({onConnect, onDisconnect}) => { 
  const { account, active, activate } = useWeb3React()
  const accountImage = useAccountImage(account)
  const [dialog, confirm] = useInstallMetamask()
  const activation = async () => {
    try {
      await activate(injected)
      onConnect(account)
      localStorage.setItem('isWalletConnected', true)
    } catch (ex) {
      console.log(ex, "Not tested scenario: 1")
    }
  }
  const connect = () => {
    if (!window.ethereum) {
      return confirm().then(() => window.open(config.metamaskDownloadLink, '_blank').focus()) 
    }
    activation()
  }

  useEffect(() => {
    if (localStorage.getItem('isWalletConnected') === 'true') {
      activation()
    }
  }, [])
  return <div className='Account'>
    <div className={classNames("status", {active})}/>
    {account
      ? <div onClick={routeTo(config.paths.selfWalletAddress)}>
        {wrapAddress(account)}
        <img src={accountImage} />
      </div>
      : <>{dialog}<Button aria-label='Connect Metamask Wallet' onClick={connect}><Icons.Link /> Connect </Button></>
    }
  </div>
}

export default connect((state) => ({}), (dispatch, props) => ({
  onConnect: (payload) => dispatch({ type: "account/connect", payload }),
  onDisconnect: (payload) => dispatch({type: "account/connect", payload}),
  
}))(Account)

const useInstallMetamask = ()=> useConfirmationDialog({ 
  title: 'Extension Required',
  message: 'Please install metamask extension to connect to blockchain.',
  button: {className:'metamask-install-button', ariaLabel:'Install Metamask Link', text:'Install'}
})