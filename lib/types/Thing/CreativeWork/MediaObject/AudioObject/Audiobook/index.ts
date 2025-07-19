import type Thing from "../../../../index.ts"
import type Duration from "../../../../Intangible/Quantity/Duration/index.ts"
import type QuantitativeValue from "../../../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type Person from "../../../../Person/index.ts"
import type { BookProps } from "../../../Book/index.ts"
import type { CreativeWorkProps } from "../../../index.ts"

export interface AudiobookProps {
	/** The duration of the item (movie, audio recording, event, etc.) in [ISO 8601 duration format](http://en.wikipedia.org/wiki/ISO_8601). */
	duration?: QuantitativeValue | Duration
	/** A person who reads (performs) the audiobook. */
	readBy?: Person
}

type Audiobook =
	& Thing
	& BookProps
	& CreativeWorkProps
	& AudiobookProps

export default Audiobook
