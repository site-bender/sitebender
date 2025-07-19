// ReactAction extends AssessAction but adds no additional properties
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { AssessActionProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface ReactActionProps {}

type ReactAction =
	& Thing
	& ActionProps
	& AssessActionProps
	& ReactActionProps

export default ReactAction
