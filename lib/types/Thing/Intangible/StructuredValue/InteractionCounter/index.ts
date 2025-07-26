import type {
	DateTime,
	Integer,
	Text,
	Time,
} from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type Action from "../../../Action/index.ts"
import type Place from "../../../Place/index.ts"
import type PostalAddress from "../ContactPoint/PostalAddress/index.ts"
import type SoftwareApplication from "../../../CreativeWork/SoftwareApplication/index.ts"
import type VirtualLocation from "../../VirtualLocation/index.ts"
import type WebSite from "../../../CreativeWork/WebSite/index.ts"

export interface InteractionCounterProps {
	endTime?: DateTime | Time
	interactionService?: SoftwareApplication | WebSite
	interactionType?: Action
	location?: Place | PostalAddress | Text | VirtualLocation
	startTime?: DateTime | Time
	userInteractionCount?: Integer
}

type InteractionCounter =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& InteractionCounterProps

export default InteractionCounter
