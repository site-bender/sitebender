import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { ListItemProps } from "../../index.ts"
import type { HowToItemProps } from "../index.ts"

export interface HowToToolProps {}

type HowToTool =
	& Thing
	& IntangibleProps
	& ListItemProps
	& HowToItemProps
	& HowToToolProps

export default HowToTool
