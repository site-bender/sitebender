import type Thing from "../../index.ts"
import type { IntangibleProps } from "../../Intangible/index.ts"
import type { ItemListProps } from "../../Intangible/ItemList/index.ts"
import type { ListItemProps } from "../../Intangible/ListItem/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import HowToSectionComponent from "../../../../../components/Thing/CreativeWork/HowToSection/index.tsx"

export interface HowToSectionProps {
}

type HowToSection =
	& Thing
	& IntangibleProps
	& ItemListProps
	& ListItemProps
	& CreativeWorkProps
	& HowToSectionProps

export default HowToSection
