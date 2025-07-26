import type { Integer, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

export interface ListItemProps {
	item?: Thing
	nextItem?: ListItem
	position?: Integer | Text
	previousItem?: ListItem
}

type ListItem =
	& Thing
	& IntangibleProps
	& ListItemProps

export default ListItem
