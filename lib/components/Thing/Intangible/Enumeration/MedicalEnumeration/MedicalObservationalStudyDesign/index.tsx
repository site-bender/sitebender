import type BaseProps from "../../../../../../types/index.ts"
import type { MedicalObservationalStudyDesignProps } from "../../../../../../types/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalObservationalStudyDesign/index.ts"

import MedicalEnumeration from "../index.tsx"

export type Props = MedicalObservationalStudyDesignProps & BaseProps

export default function MedicalObservationalStudyDesign({
	_type = "MedicalObservationalStudyDesign",
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
