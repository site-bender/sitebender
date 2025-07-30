import type BaseProps from "../../../../../../types/index.ts"
import type MedicalDevicePurposeProps from "../../../../../../types/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalDevicePurpose/index.ts"

import MedicalEnumeration from "../index.tsx"

export type Props = MedicalDevicePurposeProps & BaseProps

export default function MedicalDevicePurpose({
	_type = "MedicalDevicePurpose",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalEnumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</MedicalEnumeration>
	)
}
