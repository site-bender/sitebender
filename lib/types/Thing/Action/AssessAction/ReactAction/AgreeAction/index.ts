// AgreeAction extends ReactAction but adds no additional properties
import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { AssessActionProps } from "../../index.ts"
import type { ReactActionProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface AgreeActionProps {}

type AgreeAction =
	& Thing
	& ActionProps
	& AssessActionProps
	& ReactActionProps
	& AgreeActionProps

export default AgreeAction
