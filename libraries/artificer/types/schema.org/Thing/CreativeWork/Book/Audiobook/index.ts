import type Thing from "../../../index.ts"
import type Duration from "../../../Intangible/Quantity/Duration/index.ts"
import type QuantitativeValue from "../../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type { MediaObjectProps } from "../../../MediaObject/index.ts"
import type Person from "../../../Person/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { AudioObjectProps } from "../../MediaObject/AudioObject/index.ts"
import type { BookProps } from "../index.ts"

import DurationComponent from "../../../../../../../architect/src/define/Thing/Intangible/Quantity/Duration/index.tsx"
import QuantitativeValueComponent from "../../../../../../../architect/src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"
import PersonComponent from "../../../../../../../architect/src/define/Thing/Person/index.tsx"

export type AudiobookType = "Audiobook"

export interface AudiobookProps {
	"@type"?: AudiobookType
	duration?:
		| Duration
		| QuantitativeValue
		| ReturnType<typeof DurationComponent>
		| ReturnType<typeof QuantitativeValueComponent>
	readBy?: Person | ReturnType<typeof PersonComponent>
}

type Audiobook =
	& Thing
	& CreativeWorkProps
	& MediaObjectProps
	& AudioObjectProps
	& BookProps
	& AudiobookProps

export default Audiobook
