import type BaseProps from "../../../../types/index.ts"
import type PropertyProps from "../../../../types/Thing/Intangible/Property/index.ts"

import Intangible from "../index.tsx"

export type Props = PropertyProps & BaseProps

export default function Property({
	domainIncludes,
	inverseOf,
	rangeIncludes,
	supersededBy,
	_type = "Property",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				domainIncludes,
				inverseOf,
				rangeIncludes,
				supersededBy,
				...subtypeProperties,
			}}
		>
			{children}
		</Intangible>
	)
}
