import type Thing from "../../index.ts"
import type { IntangibleProps } from "../../Intangible/index.ts"
import type { ListItemProps } from "../../Intangible/ListItem/index.ts"
import type { CreativeWorkProps } from "../index.ts"

export type HowToTipType = "HowToTip"

export interface HowToTipProps {
	"@type"?: HowToTipType
}

type HowToTip =
	& Thing
	& IntangibleProps
	& ListItemProps
	& CreativeWorkProps
	& HowToTipProps

export default HowToTip
