import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"

export type SearchActionType = "SearchAction"

export interface SearchActionProps {
	"@type"?: SearchActionType
	query?: Text
}

type SearchAction = Thing & ActionProps & SearchActionProps

export default SearchAction
