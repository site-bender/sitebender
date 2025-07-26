import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { MediaObjectProps } from "../../../MediaObject/index.ts"
import type { AudioObjectProps } from "../../MediaObject/AudioObject/index.ts"
import type { BookProps } from "../index.ts"
import type Duration from "../../../Intangible/Quantity/Duration/index.ts"
import type Person from "../../../Person/index.ts"
import type QuantitativeValue from "../../../Intangible/StructuredValue/QuantitativeValue/index.ts"

export interface AudiobookProps {
	duration?: Duration | QuantitativeValue
	readBy?: Person
}

type Audiobook =
	& Thing
	& CreativeWorkProps
	& MediaObjectProps
	& AudioObjectProps
	& BookProps
	& AudiobookProps

export default Audiobook
