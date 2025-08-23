import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"
import type { CheckActionType } from "./CheckAction/index.ts"
import type { DiscoverActionType } from "./DiscoverAction/index.ts"
import type { TrackActionType } from "./TrackAction/index.ts"

export type FindActionType =
	| "FindAction"
	| CheckActionType
	| DiscoverActionType
	| TrackActionType

export interface FindActionProps {
	"@type"?: FindActionType
}

type FindAction = Thing & ActionProps & FindActionProps

export default FindAction
