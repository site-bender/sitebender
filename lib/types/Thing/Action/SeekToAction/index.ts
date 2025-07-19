import type { Number } from "../../../DataType/index.ts"
import type HyperTocEntry from "../../CreativeWork/HyperTocEntry/index.ts"
import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"

export interface SeekToActionProps {
	/** The start time of the clip expressed as the number of seconds from the beginning of the work. */
	startOffset?: Number | HyperTocEntry
}

type SeekToAction =
	& Thing
	& ActionProps
	& SeekToActionProps

export default SeekToAction
