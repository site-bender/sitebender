import type BaseProps from "../../../../../types/index.ts"
import type OwnershipInfoProps from "../../../../../types/Thing/Intangible/StructuredValue/OwnershipInfo/index.ts"

import StructuredValue from "../index.tsx"

export type Props = OwnershipInfoProps & BaseProps

export default function OwnershipInfo({
	acquiredFrom,
	ownedFrom,
	ownedThrough,
	typeOfGood,
	_type = "OwnershipInfo",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StructuredValue
			{...props}
			_type={_type}
			subtypeProperties={{
				acquiredFrom,
				ownedFrom,
				ownedThrough,
				typeOfGood,
				...subtypeProperties,
			}}
		>
			{children}
		</StructuredValue>
	)
}
