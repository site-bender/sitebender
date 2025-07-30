import type Thing from "../../index.ts"
import type { IntangibleProps } from "../../Intangible/index.ts"
import type { ItemListProps } from "../../Intangible/ItemList/index.ts"
import type { ListItemProps } from "../../Intangible/ListItem/index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface HowToStepProps {
	"@type"?: "HowToStep"}

type HowToStep =
	& Thing
	& IntangibleProps
	& ItemListProps
	& ListItemProps
	& CreativeWorkProps
	& HowToStepProps

export default HowToStep
