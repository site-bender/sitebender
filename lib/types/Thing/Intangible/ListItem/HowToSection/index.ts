import type { Text } from "../../../../DataType/index.ts"
import type CreativeWork from "../../../CreativeWork/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type ItemList from "../../ItemList/index.ts"
import type { ListItemProps } from "../index.ts"

export interface HowToSectionProps {
	/** A single step item (as HowToStep, text, document, video, etc.) or a HowToSection (originally misnamed 'steps'; 'step' is preferred). */
	steps?: Text | ItemList | CreativeWork
}

type HowToSection =
	& Thing
	& IntangibleProps
	& ListItemProps
	& HowToSectionProps

export default HowToSection
