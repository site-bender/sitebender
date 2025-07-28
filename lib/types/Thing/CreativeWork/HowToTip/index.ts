import type Thing from "../../index.ts"
import type { IntangibleProps } from "../../Intangible/index.ts"
import type { ListItemProps } from "../../Intangible/ListItem/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import HowToTipComponent from "../../../../../components/Thing/CreativeWork/HowToTip/index.tsx"

export interface HowToTipProps {
}

type HowToTip =
	& Thing
	& IntangibleProps
	& ListItemProps
	& CreativeWorkProps
	& HowToTipProps

export default HowToTip
