import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type CreativeWork from "../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface QuotationProps {
	/** The (e.g. fictional) character, Person or Organization to whom the quotation is attributed within the containing CreativeWork. */
	spokenByCharacter?: Organization | Person
}

type Quotation =
	& Thing
	& CreativeWorkProps
	& QuotationProps

export default Quotation
