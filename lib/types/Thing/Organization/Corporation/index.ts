import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

import CorporationComponent from "../../../../../components/Thing/Organization/Corporation/index.tsx"

export interface CorporationProps {
	tickerSymbol?: Text
}

type Corporation =
	& Thing
	& OrganizationProps
	& CorporationProps

export default Corporation
