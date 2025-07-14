import { Integer, Text } from "../../../DataType/index.ts"
import Thing from "../../../index.ts"
import Intangible from "../index.ts"

export default interface ListItem extends Intangible {
	/** An entity represented by an entry in a list or data feed (e.g. an 'artist' in a list of 'artists'). */
	item?: Thing
	/** A link to the ListItem that follows the current one. */
	nextItem?: ListItem
	/** The position of an item in a series or sequence of items. */
	position?: Text | Integer
	/** A link to the ListItem that precedes the current one. */
	previousItem?: ListItem
}
