import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ServiceProps } from "../index.ts"

import TaxiComponent from "../../../../../../components/Thing/Intangible/Service/Taxi/index.tsx"

export interface TaxiProps {
}

type Taxi =
	& Thing
	& IntangibleProps
	& ServiceProps
	& TaxiProps

export default Taxi
