import type BaseProps from "../../../../../types/index.ts"
import type { BookmarkActionProps } from "../../../../../types/Thing/Action/OrganizeAction/BookmarkAction/index.ts"

import OrganizeAction from "../index.tsx"

export type Props = BookmarkActionProps & BaseProps

export default function BookmarkAction({
	_type = "BookmarkAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<OrganizeAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
