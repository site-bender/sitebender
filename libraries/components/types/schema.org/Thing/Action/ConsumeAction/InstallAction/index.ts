import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ConsumeActionProps } from "../index.ts"

export type InstallActionType = "InstallAction"

export interface InstallActionProps {
	"@type"?: InstallActionType
}

type InstallAction =
	& Thing
	& ActionProps
	& ConsumeActionProps
	& InstallActionProps

export default InstallAction
