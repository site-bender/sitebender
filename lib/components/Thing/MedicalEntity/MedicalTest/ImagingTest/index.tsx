import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../../types/Thing/MedicalEntity/index.ts"
import type { MedicalTestProps } from "../../../../../types/Thing/MedicalEntity/MedicalTest/index.ts"
import type { ImagingTestProps } from "../../../../../types/Thing/MedicalEntity/MedicalTest/ImagingTest/index.ts"

import MedicalTest from "../index.tsx"

export type Props = BaseComponentProps<
	ImagingTestProps,
	"ImagingTest",
	ExtractLevelProps<ThingProps, MedicalEntityProps, MedicalTestProps>
>

export default function ImagingTest({
	imagingTechnique,
	schemaType = "ImagingTest",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<MedicalTest
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				imagingTechnique,
				...subtypeProperties,
			}}
		/>
	)
}
