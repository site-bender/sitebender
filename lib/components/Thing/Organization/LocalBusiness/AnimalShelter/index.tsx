import type BaseProps from "../../../../../types/index.ts"
import type AnimalShelterProps from "../../../../../types/Thing/Organization/LocalBusiness/AnimalShelter/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = AnimalShelterProps & BaseProps

export default function AnimalShelter({
	_type = "AnimalShelter",
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
