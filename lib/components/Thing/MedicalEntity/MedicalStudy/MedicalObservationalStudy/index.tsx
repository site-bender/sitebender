import type BaseProps from "../../../../../types/index.ts"
import type { MedicalObservationalStudyProps } from "../../../../../types/Thing/MedicalEntity/MedicalStudy/MedicalObservationalStudy/index.ts"

import MedicalStudy from "../index.tsx"

export type Props = MedicalObservationalStudyProps & BaseProps

export default function MedicalObservationalStudy({
	studyDesign,
	_type = "MedicalObservationalStudy",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalStudy
			{...props}
			_type={_type}
			subtypeProperties={{
				studyDesign,
				...subtypeProperties,
			}}
		/>
	)
}
