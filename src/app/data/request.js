import bent from "bent"
import { config } from "../../utils"

export default bent(config.API.baseUrl, "json", "GET")
