import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"

export interface AssessActionProps {
	"@type"?: "AssessAction"}

type AssessAction = Thing & ActionProps & AssessActionProps

export default AssessAction
