import type BaseProps from "../../../../../types/index.ts"
import type LibraryProps from "../../../../../types/Thing/Organization/LocalBusiness/Library/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = LibraryProps & BaseProps

export default function Library({
	_type = "Library",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<LocalBusiness
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
