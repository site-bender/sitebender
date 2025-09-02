import type Thing from "../../../index.ts"
import type Duration from "../../../Intangible/Quantity/Duration/index.ts"
import type QuantitativeValue from "../../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type { MediaObjectProps } from "../../../MediaObject/index.ts"
import type Person from "../../../Person/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { AudioObjectProps } from "../../MediaObject/AudioObject/index.ts"
import type { BookProps } from "../index.ts"

import { Duration as DurationComponent } from "../../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../../components/index.tsx"
import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../../components/index.tsx"

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
