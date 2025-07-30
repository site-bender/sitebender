import type { Integer, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

import ThingComponent from "../../../../components/Thing/index.ts"
import ListItemComponent from "../../../../components/Thing/Intangible/ListItem/index.ts"

export interface ListItemProps {
	"@type"?: "ListItem"
	item?: Thing | ReturnType<typeof ThingComponent>
	nextItem?: ListItem | ReturnType<typeof ListItemComponent>
	position?: Integer | Text
	previousItem?: ListItem | ReturnType<typeof ListItemComponent>
}

type ListItem = Thing & IntangibleProps & ListItemProps

export default ListItem
