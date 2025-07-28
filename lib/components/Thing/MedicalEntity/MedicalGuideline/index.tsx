import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../types/Thing/MedicalEntity/index.ts"
import type { MedicalGuidelineProps } from "../../../../types/Thing/MedicalEntity/MedicalGuideline/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = BaseComponentProps<
	MedicalGuidelineProps,
	"MedicalGuideline",
	ExtractLevelProps<ThingProps, MedicalEntityProps>
>

export default function MedicalGuideline({
	evidenceLevel,
	evidenceOrigin,
	guidelineDate,
	guidelineSubject,
	schemaType = "MedicalGuideline",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<MedicalEntity
			{...props}
			schemaType={schemaType}
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
