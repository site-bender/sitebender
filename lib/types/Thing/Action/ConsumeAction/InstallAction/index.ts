import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ConsumeActionProps } from "../index.ts"

export interface InstallActionProps {
	"@type"?: "InstallAction"}

type InstallAction =
	& Thing
	& ActionProps
	& ConsumeActionProps
	& InstallActionProps

export default InstallAction
