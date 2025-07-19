import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"

export interface SearchActionProps {
	/** A sub property of instrument. The query used on this action. */
	query?: Text
}

type SearchAction =
	& Thing
	& ActionProps
	& SearchActionProps

export default SearchAction
