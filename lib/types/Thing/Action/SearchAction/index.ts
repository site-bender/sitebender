import { Text } from "../../../DataType/index.ts"
import Action from "../index.ts"

export default interface SearchAction extends Action {
	/** A sub property of instrument. The query used on this action. */
	query?: Text
}
