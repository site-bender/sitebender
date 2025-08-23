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
export interface AudioElement {
	attributes?: Override<
		Partial<HTMLAudioElement>,
		GlobalAttributeOverrides & {
			// space-separated string of "nodownload" | "nofullscreen" | "noremoteplayback"
			controlsList?: string
			crossOrigin?: CrossOrigin
			role?: Extract<AriaRole, "application">
		}
	>
	children?: Array<AudioContent>
	dataset?: Dataset
	readonly tagName: "AUDIO"
}

export type AudioContent =
	| Exclude<FlowContent, { tagName: "AUDIO" } | { tagName: "VIDEO" }>
	| SourceElement
	| TrackElement
