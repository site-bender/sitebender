import type { Integer, Text } from "../../../DataType/index.ts"
import type { Thing } from "../../index.ts"
import type { Intangible } from "../index.ts"

// ListItem interface - extends Intangible
// An list item, e.g. a step in a checklist or how-to description.
export interface ListItem extends Intangible {
	item?: Thing
	nextItem?: ListItem
	position?: Integer | Text
	previousItem?: ListItem
}
