import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

export interface CorporationProps {
	/** The exchange traded instrument associated with a Corporation object. The tickerSymbol is expressed as an exchange and an instrument name separated by a space character. For the exchange component of the tickerSymbol attribute, we recommend using the controlled vocabulary of Market Identifier Codes (MIC) specified in ISO 15022. */
	tickerSymbol?: Text
}

type Corporation =
	& Thing
	& OrganizationProps
	& CorporationProps

export default Corporation
