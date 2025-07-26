import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"

export interface QuotationProps {
	spokenByCharacter?: Organization | Person
}

type Quotation =
	& Thing
	& CreativeWorkProps
	& QuotationProps

export default Quotation
