import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ServiceProps } from "../index.ts"

export interface TaxiServiceProps {
	"@type"?: "TaxiService"}

type TaxiService = Thing & IntangibleProps & ServiceProps & TaxiServiceProps

export default TaxiService
