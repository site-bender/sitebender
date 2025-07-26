import type { Number } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"
import type HyperTocEntry from "../../CreativeWork/HyperTocEntry/index.ts"

export interface SeekToActionProps {
	startOffset?: HyperTocEntry | Number
}

type SeekToAction =
	& Thing
	& ActionProps
	& SeekToActionProps

export default SeekToAction
