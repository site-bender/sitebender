import type { FlowContent } from "../../categories/flow/index.ts"
import type {
	AriaRole,
	CrossOrigin,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { SourceElement } from "../source/index.ts"
import type { TrackElement } from "../track/index.ts"

// TODO
export interface VideoElement {
	attributes?: Override<
		Partial<HTMLVideoElement>,
		GlobalAttributeOverrides & {
			// space-separated string of "nodownload" | "nofullscreen" | "noremoteplayback"
			controlsList?: string
			crossOrigin?: CrossOrigin
			role?: Extract<AriaRole, "application">
		}
	>
	children?: Array<FlowContent>
	dataset?: Dataset
	readonly tagName: "VIDEO"
}

export type Content =
	| Exclude<FlowContent, { tagName: "AUDIO" } | { tagName: "VIDEO" }>
	| SourceElement
	| TrackElement
