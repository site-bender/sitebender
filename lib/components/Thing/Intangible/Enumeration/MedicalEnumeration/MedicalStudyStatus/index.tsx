import type BaseProps from "../../../../../../types/index.ts"
import type MedicalStudyStatusProps from "../../../../../../types/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalStudyStatus/index.ts"

import MedicalEnumeration from "../index.tsx"

export type Props = MedicalStudyStatusProps & BaseProps

export default function MedicalStudyStatus({
	_type = "MedicalStudyStatus",
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
