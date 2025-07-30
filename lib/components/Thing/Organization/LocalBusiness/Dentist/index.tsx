import type BaseProps from "../../../../../types/index.ts"
import type DentistProps from "../../../../../types/Thing/Organization/LocalBusiness/Dentist/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = DentistProps & BaseProps

export default function Dentist({
	_type = "Dentist",
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
