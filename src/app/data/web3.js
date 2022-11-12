import { utils } from "ethers"
import { notify } from "../../utils"
import { bindContract,contractRequester, getPublicContract, getSignerContract } from "../../utils/web3"
import abi from './abi.json'

export const transactAPI = (address, chainId) => {
  if (!address) return {}
  const request = contractRequester(getSignerContract(address, abi, chainId))
  return ({
    createStation: ({lat, lon}) =>
      request("createStation", {lat:toUInt128(lat), lon:toUInt128(lon)})
        .then((e) => {
          notify.success()
          return e.events[0].args[1]
        }),
  })
}

export const callAPI = bindContract(getPublicContract(43112), {
  getKeyChain: (get, address) =>
    get.retrieveKeys(utils.getAddress(address))
      .then((arr) =>
        [...arr].reverse()),
  getVehicle: (get, vehicleId) => get.vehicles(vehicleId + '')
    .then(({ id, vin, plate}) =>
    ({
      id, vin, plate
    })),
  getVehicleIdFromPlate: (get, plate) => get.plates(plate + '')
    .then((id) =>id),
  getStation: (get, stationId) => get.station(stationId + '')
    .then(({ id}) =>
    ({
      id
    })),
})

const toUInt128 = (floatValue) => {
  const [intg, rest] = floatValue.toString().split(".")
  
  return "1" + intg.padStart("3", "0") + (rest||"")
}
const fromUInt128 = (uint128) => {
  uint128=uint128.toString()
  return Number(uint128.substr(1,3)+"."+(uint128.substring(4).length?uint128.substring(4):0))
}