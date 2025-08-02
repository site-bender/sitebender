import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

export type CorporationType = "Corporation"

export interface CorporationProps {
	"@type"?: CorporationType
	tickerSymbol?: Text
}

type Corporation = Thing & OrganizationProps & CorporationProps

export default Corporation
