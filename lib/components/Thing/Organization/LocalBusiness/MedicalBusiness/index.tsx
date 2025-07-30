import type BaseProps from "../../../../../types/index.ts"
import type MedicalBusinessProps from "../../../../../types/Thing/Organization/LocalBusiness/MedicalBusiness/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = MedicalBusinessProps & BaseProps

export default function MedicalBusiness({
	_type = "MedicalBusiness",
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
