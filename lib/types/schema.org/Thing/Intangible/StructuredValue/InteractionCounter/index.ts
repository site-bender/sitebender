import type {
	DateTime,
	Integer,
	Text,
	Time,
} from "../../../../DataType/index.ts"
import type Action from "../../../Action/index.ts"
import type SoftwareApplication from "../../../CreativeWork/SoftwareApplication/index.ts"
import type WebSite from "../../../CreativeWork/WebSite/index.ts"
import type Thing from "../../../index.ts"
import type Place from "../../../Place/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type VirtualLocation from "../../VirtualLocation/index.ts"
import type PostalAddress from "../ContactPoint/PostalAddress/index.ts"
import type { StructuredValueProps } from "../index.ts"

import { Action as ActionComponent } from "../../../../../../components/index.tsx"
import { SoftwareApplication as SoftwareApplicationComponent } from "../../../../../../components/index.tsx"
import { WebSite as WebSiteComponent } from "../../../../../../components/index.tsx"
import { PostalAddress as PostalAddressComponent } from "../../../../../../components/index.tsx"
import { VirtualLocation as VirtualLocationComponent } from "../../../../../../components/index.tsx"
import { Place as PlaceComponent } from "../../../../../../components/index.tsx"

export type InteractionCounterType = "InteractionCounter"

export interface InteractionCounterProps {
	"@type"?: InteractionCounterType
	endTime?: DateTime | Time
	interactionService?:
		| SoftwareApplication
		| WebSite
		| ReturnType<typeof SoftwareApplicationComponent>
		| ReturnType<typeof WebSiteComponent>
	interactionType?: Action | ReturnType<typeof ActionComponent>
	location?:
		| Place
		| PostalAddress
		| Text
		| VirtualLocation
		| ReturnType<typeof PlaceComponent>
		| ReturnType<typeof PostalAddressComponent>
		| ReturnType<typeof VirtualLocationComponent>
	startTime?: DateTime | Time
	userInteractionCount?: Integer
}

type InteractionCounter =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& InteractionCounterProps

export default InteractionCounter
