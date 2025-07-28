import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { QuantityProps } from "../index.ts"

import DurationComponent from "../../../../../../components/Thing/Intangible/Quantity/Duration/index.tsx"

export interface DurationProps {
}

type Duration =
	& Thing
	& IntangibleProps
	& QuantityProps
	& DurationProps

export default Duration
