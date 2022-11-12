import { lazy } from "react";
import { Switch, Route } from 'react-router-dom'
import { withParams } from "../utils";
import config from '../config'

export const Vehicle = lazy(() => import("./Vehicle/Vehicle"))
export const Station = lazy(() => import("./Station/Station"))
export const Home = lazy(() => import("./Home/Home"))

export default () => <Switch>
  <Route exact path='/' component={Home}/>
  <Route exact path={config.paths.vehicle + ':vehicleId'} component={withParams(Vehicle)}/>
  <Route exact path={config.paths.station + ':stationId'} component={withParams(Station)}/>
</Switch>