import type Thing from "../../index.ts"
import type { IntangibleProps } from "../../Intangible/index.ts"
import type { ItemListProps } from "../../Intangible/ItemList/index.ts"
import type { ListItemProps } from "../../Intangible/ListItem/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import HowToStepComponent from "../../../../../components/Thing/CreativeWork/HowToStep/index.tsx"

export interface HowToStepProps {
}

type HowToStep =
	& Thing
	& IntangibleProps
	& ItemListProps
	& ListItemProps
	& CreativeWorkProps
	& HowToStepProps

export default HowToStep
