import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { ListItemProps } from "../../index.ts"
import type { HowToItemProps } from "../index.ts"

import HowToToolComponent from "../../../../../../../components/Thing/Intangible/ListItem/HowToItem/HowToTool/index.tsx"

export interface HowToToolProps {
}

type HowToTool =
	& Thing
	& IntangibleProps
	& ListItemProps
	& HowToItemProps
	& HowToToolProps

export default HowToTool
