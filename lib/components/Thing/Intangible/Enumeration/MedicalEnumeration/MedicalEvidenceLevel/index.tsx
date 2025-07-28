import type BaseProps from "../../../../../../types/index.ts"
import type { MedicalEvidenceLevelProps } from "../../../../../../types/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalEvidenceLevel/index.ts"

import MedicalEnumeration from "../index.tsx"

export type Props = MedicalEvidenceLevelProps & BaseProps

export default function MedicalEvidenceLevel({
	_type = "MedicalEvidenceLevel",
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
		/>
	)
}
