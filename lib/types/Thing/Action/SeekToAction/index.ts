import type { Number } from "../../../DataType/index.ts"
import type HyperTocEntry from "../../CreativeWork/HyperTocEntry/index.ts"
import type Action from "../index.ts"

export default interface SeekToAction extends Action {
	/** The start time of the clip expressed as the number of seconds from the beginning of the work. */
	startOffset?: Number | HyperTocEntry
}
