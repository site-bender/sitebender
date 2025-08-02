import type { Number } from "../../../DataType/index.ts"
import type HyperTocEntry from "../../CreativeWork/HyperTocEntry/index.ts"
import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"

import HyperTocEntryComponent from "../../../../components/Thing/CreativeWork/HyperTocEntry/index.ts"

export type SeekToActionType = "SeekToAction"

export interface SeekToActionProps {
	"@type"?: SeekToActionType
	startOffset?:
		| HyperTocEntry
		| Number
		| ReturnType<typeof HyperTocEntryComponent>
}

type SeekToAction = Thing & ActionProps & SeekToActionProps

export default SeekToAction
