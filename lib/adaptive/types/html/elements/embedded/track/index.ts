import type { Dataset, GlobalAttributeOverrides, Override } from "../../shared"

export interface TrackElement {
	attributes?: Override<Partial<HTMLTrackElement>, GlobalAttributeOverrides>
	children?: never
	dataset?: Dataset
	readonly tagName: "TRACK"
}
