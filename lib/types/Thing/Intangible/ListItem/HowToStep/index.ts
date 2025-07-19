// HowToStep extends ListItem but adds no additional properties
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ListItemProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface HowToStepProps {}

type HowToStep =
	& Thing
	& IntangibleProps
	& ListItemProps
	& HowToStepProps

export default HowToStep
