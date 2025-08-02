import type BaseProps from "../../../../types/index.ts"
import type SearchActionProps from "../../../../types/Thing/Action/SearchAction/index.ts"

import Action from "../index.tsx"

export type Props = SearchActionProps & BaseProps

export default function SearchAction({
	query,
	_type = "SearchAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Action
			{...props}
			_type={_type}
			subtypeProperties={{
				query,
				...subtypeProperties,
			}}
		>
			{children}
		</Action>
	)
}
