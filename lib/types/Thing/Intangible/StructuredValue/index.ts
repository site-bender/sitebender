import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

import StructuredValueComponent from "../../../../../components/Thing/Intangible/StructuredValue/index.tsx"

export interface StructuredValueProps {
}

type StructuredValue =
	& Thing
	& IntangibleProps
	& StructuredValueProps

export default StructuredValue
