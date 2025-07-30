import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { AssessActionProps } from "../index.ts"

export interface ReactActionProps {
	"@type"?: "ReactAction"}

type ReactAction = Thing & ActionProps & AssessActionProps & ReactActionProps

export default ReactAction
