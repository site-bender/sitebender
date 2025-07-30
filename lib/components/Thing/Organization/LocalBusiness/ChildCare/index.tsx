import type BaseProps from "../../../../../types/index.ts"
import type ChildCareProps from "../../../../../types/Thing/Organization/LocalBusiness/ChildCare/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = ChildCareProps & BaseProps

export default function ChildCare({
	_type = "ChildCare",
	children,
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
		>{children}</LocalBusiness>
	)
}
