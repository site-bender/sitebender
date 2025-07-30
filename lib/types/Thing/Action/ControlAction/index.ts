import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"

export interface ControlActionProps {
	"@type"?: "ControlAction"}

type ControlAction = Thing & ActionProps & ControlActionProps

export default ControlAction
