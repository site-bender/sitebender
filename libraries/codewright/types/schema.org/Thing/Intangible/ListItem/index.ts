import type { Integer, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type { HowToDirectionType } from "./HowToDirection/index.ts"
import type { HowToItemType } from "./HowToItem/index.ts"
import type { HowToSectionType } from "./HowToSection/index.ts"
import type { HowToStepType } from "./HowToStep/index.ts"
import type { HowToTipType } from "./HowToTip/index.ts"

import ThingComponent from "../../../../../src/define/Thing/index.tsx"
import ListItemComponent from "../../../../../src/define/Thing/Intangible/ListItem/index.tsx"

export type ListItemType =
	| "ListItem"
	| HowToTipType
	| HowToItemType
	| HowToDirectionType
	| HowToSectionType
	| HowToStepType

export interface ListItemProps {
	"@type"?: ListItemType
	item?: Thing | ReturnType<typeof ThingComponent>
	nextItem?: ListItem | ReturnType<typeof ListItemComponent>
	position?: Integer | Text
	previousItem?: ListItem | ReturnType<typeof ListItemComponent>
}

type ListItem = Thing & IntangibleProps & ListItemProps

export default ListItem
