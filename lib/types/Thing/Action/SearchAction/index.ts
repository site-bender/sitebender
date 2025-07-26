import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"

export interface SearchActionProps {
	query?: Text
}

type SearchAction =
	& Thing
	& ActionProps
	& SearchActionProps

export default SearchAction
