import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type ActionProps from "../../../../types/Thing/Action/index.ts"
import type SearchActionProps from "../../../../types/Thing/SearchAction/index.ts"

import Action from "./index.tsx"

export type Props = BaseComponentProps<
	SearchActionProps,
	"SearchAction",
	ExtractLevelProps<SearchActionProps, ActionProps>
>

export default function SearchAction(
	{
		query,
		schemaType = "SearchAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Action
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				query,
				...subtypeProperties,
			}}
		/>
	)
}
