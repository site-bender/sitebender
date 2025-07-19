// HowToTool extends HowToItem but adds no additional properties
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { ListItemProps } from "../../index.ts"
import type { HowToItemProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface HowToToolProps {}

type HowToTool =
	& Thing
	& HowToItemProps
	& IntangibleProps
	& ListItemProps
	& HowToToolProps

export default HowToTool
