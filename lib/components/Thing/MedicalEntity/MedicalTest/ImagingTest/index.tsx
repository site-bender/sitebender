import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ImagingTestProps from "../../../../../types/Thing/ImagingTest/index.ts"
import type MedicalTestProps from "../../../../../types/Thing/MedicalTest/index.ts"

import MedicalTest from "../index.tsx"

export type Props = BaseComponentProps<
	ImagingTestProps,
	"ImagingTest",
	ExtractLevelProps<ImagingTestProps, MedicalTestProps>
>

export default function ImagingTest(
	{
		imagingTechnique,
		schemaType = "ImagingTest",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
