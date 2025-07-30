import type BaseProps from "../../../../../types/index.ts"
import type CountryProps from "../../../../../types/Thing/Place/AdministrativeArea/Country/index.ts"

import AdministrativeArea from "../index.tsx"

export type Props = CountryProps & BaseProps

export default function Country({
	_type = "Country",
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
