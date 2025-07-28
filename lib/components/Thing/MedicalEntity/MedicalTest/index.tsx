import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../types/Thing/MedicalEntity/index.ts"
import type { MedicalTestProps } from "../../../../types/Thing/MedicalEntity/MedicalTest/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = BaseComponentProps<
	MedicalTestProps,
	"MedicalTest",
	ExtractLevelProps<ThingProps, MedicalEntityProps>
>

export default function MedicalTest({
	affectedBy,
	normalRange,
	signDetected,
	usedToDiagnose,
	usesDevice,
	schemaType = "MedicalTest",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<MedicalEntity
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				affectedBy,
				normalRange,
				signDetected,
				usedToDiagnose,
				usesDevice,
				...subtypeProperties,
			}}
		/>
	)
}
