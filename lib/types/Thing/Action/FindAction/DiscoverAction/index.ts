// DiscoverAction extends FindAction but adds no additional properties
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { FindActionProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface DiscoverActionProps {}

type DiscoverAction =
	& Thing
	& ActionProps
	& FindActionProps
	& DiscoverActionProps

export default DiscoverAction
