import type BaseProps from "../../../../../types/index.ts"
import type BusinessEntityTypeProps from "../../../../../types/Thing/Intangible/Enumeration/BusinessEntityType/index.ts"

import Enumeration from "../index.tsx"

export type Props = BusinessEntityTypeProps & BaseProps

export default function BusinessEntityType({
	_type = "BusinessEntityType",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Enumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</Enumeration>
	)
}
