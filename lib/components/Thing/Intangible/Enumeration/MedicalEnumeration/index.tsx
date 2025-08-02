import type BaseProps from "../../../../../types/index.ts"
import type MedicalEnumerationProps from "../../../../../types/Thing/Intangible/Enumeration/MedicalEnumeration/index.ts"

import Enumeration from "../index.tsx"

export type Props = MedicalEnumerationProps & BaseProps

export default function MedicalEnumeration({
	_type = "MedicalEnumeration",
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
		>
			{children}
		</Enumeration>
	)
}
