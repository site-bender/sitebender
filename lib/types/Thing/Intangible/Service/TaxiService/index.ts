import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ServiceProps } from "../index.ts"

import TaxiServiceComponent from "../../../../../../components/Thing/Intangible/Service/TaxiService/index.tsx"

export interface TaxiServiceProps {
}

type TaxiService =
	& Thing
	& IntangibleProps
	& ServiceProps
	& TaxiServiceProps

export default TaxiService
