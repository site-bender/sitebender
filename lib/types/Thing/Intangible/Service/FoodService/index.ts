import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ServiceProps } from "../index.ts"

import FoodServiceComponent from "../../../../../../components/Thing/Intangible/Service/FoodService/index.tsx"

export interface FoodServiceProps {
}

type FoodService =
	& Thing
	& IntangibleProps
	& ServiceProps
	& FoodServiceProps

export default FoodService
