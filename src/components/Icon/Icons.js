import Up from '@mui/icons-material/ArrowCircleUp'
import Eye from '@mui/icons-material/Visibility'
import Pen from '@mui/icons-material/Create'
import Key from '@mui/icons-material/Key'
import Celo from './chain/celo.svg'
import Link from '@mui/icons-material/Link'
import Spin from '@mui/icons-material/Cached'
import Plus from '@mui/icons-material/AddCircleOutline'
import User from '@mui/icons-material/Person'
import Money from '@mui/icons-material/Money'
import Check from '@mui/icons-material/Check'
import Cross from '@mui/icons-material/Remove'
import Share from '@mui/icons-material/Send'
import Award from '@mui/icons-material/WorkspacePremium'
import Print from '@mui/icons-material/Print'
import Expand from '@mui/icons-material/ExpandMore'
import Revoke from '@mui/icons-material/KeyOff'
import Search from '@mui/icons-material/Search'
import Wallet from '@mui/icons-material/AccountBalanceWallet'
import SendCert from '@mui/icons-material/FolderShared'
import LinkedIn from '@mui/icons-material/LinkedIn'
import Avalanche from './chain/avax.svg'
import Institute from '@mui/icons-material/AccountBalance'
import Authorize from '@mui/icons-material/HowToReg'
import certumLogo from './chain/CERTUM.svg'
import Authorized from '@mui/icons-material/AccountCircle'
import Department from '@mui/icons-material/AccountTree'
import TransferOrg from '@mui/icons-material/TransferWithinAStation'
import Settings from '@mui/icons-material/Settings'

export const Icons = {
  Print, SendCert, Money, User, Settings,
  Avalanche: () => <img alt="avalanche" height={40} src={Avalanche} />,
  Celo: () => <img alt="celo" height={40} src={Celo} />,
  Token: () => <img alt="certum" height={40} src={certumLogo} />,
  TransferOrg, Department, Expand, Share, LinkedIn, Institute, Award, Authorize,
  Revoke, Eye, Search, Key, Link, Up, Check, Cross, Spin, Wallet, Plus, Pen, Authorized
}
