import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import BusinessEntityTypeComponent from "../../../../../../components/Thing/Intangible/Enumeration/BusinessEntityType/index.tsx"

export interface BusinessEntityTypeProps {
}

type BusinessEntityType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& BusinessEntityTypeProps

export default BusinessEntityType
