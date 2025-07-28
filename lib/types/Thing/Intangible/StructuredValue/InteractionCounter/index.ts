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

import ActionComponent from "../../../../../components/Thing/Action/index.ts"
import SoftwareApplicationComponent from "../../../../../components/Thing/CreativeWork/SoftwareApplication/index.ts"
import WebSiteComponent from "../../../../../components/Thing/CreativeWork/WebSite/index.ts"
import PostalAddressComponent from "../../../../../components/Thing/Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import VirtualLocationComponent from "../../../../../components/Thing/Intangible/VirtualLocation/index.ts"
import PlaceComponent from "../../../../../components/Thing/Place/index.ts"

export interface InteractionCounterProps {
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
