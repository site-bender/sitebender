import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import BusinessFunctionComponent from "../../../../../../components/Thing/Intangible/Enumeration/BusinessFunction/index.tsx"

export interface BusinessFunctionProps {
}

type BusinessFunction =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& BusinessFunctionProps

export default BusinessFunction
