import type BaseProps from "../../../../types/index.ts"
import type { MedicalGuidelineProps } from "../../../../types/Thing/MedicalEntity/MedicalGuideline/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = MedicalGuidelineProps & BaseProps

export default function MedicalGuideline({
	evidenceLevel,
	evidenceOrigin,
	guidelineDate,
	guidelineSubject,
	_type = "MedicalGuideline",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalEntity
			{...props}
			_type={_type}
			subtypeProperties={{
				evidenceLevel,
				evidenceOrigin,
				guidelineDate,
				guidelineSubject,
				...subtypeProperties,
			}}
		/>
	)
}
