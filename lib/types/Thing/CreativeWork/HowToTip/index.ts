import type Thing from "../../index.ts"
import type { IntangibleProps } from "../../Intangible/index.ts"
import type { ListItemProps } from "../../Intangible/ListItem/index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface HowToTipProps {
}

type HowToTip =
	& Thing
	& IntangibleProps
	& ListItemProps
	& CreativeWorkProps
	& HowToTipProps

export default HowToTip
