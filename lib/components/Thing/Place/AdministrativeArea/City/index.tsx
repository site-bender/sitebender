import type BaseProps from "../../../../../types/index.ts"
import type CityProps from "../../../../../types/Thing/Place/AdministrativeArea/City/index.ts"

import AdministrativeArea from "../index.tsx"

export type Props = CityProps & BaseProps

export default function City({
	_type = "City",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<AdministrativeArea
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</AdministrativeArea>
	)
}
