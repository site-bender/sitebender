import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

export interface CorporationProps {
	"@type"?: "Corporation"
	tickerSymbol?: Text
}

type Corporation = Thing & OrganizationProps & CorporationProps

export default Corporation
