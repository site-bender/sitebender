import type BaseProps from "../../../../../../types/index.ts"
import type MedicalAudienceTypeProps from "../../../../../../types/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalAudienceType/index.ts"

import MedicalEnumeration from "../index.tsx"

export type Props = MedicalAudienceTypeProps & BaseProps

export default function MedicalAudienceType({
	_type = "MedicalAudienceType",
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
