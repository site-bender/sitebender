import type {
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../index.ts"

export interface TrackElement {
	attributes?: Override<Partial<HTMLTrackElement>, GlobalAttributeOverrides>
	children?: never
	dataset?: Dataset
	readonly tagName: "TRACK"
}
