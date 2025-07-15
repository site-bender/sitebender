import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MedicalTestProps from "../../../../../types/Thing/MedicalTest/index.ts"
import type PathologyTestProps from "../../../../../types/Thing/PathologyTest/index.ts"

import MedicalTest from "./index.tsx"

export type Props = BaseComponentProps<
	PathologyTestProps,
	"PathologyTest",
	ExtractLevelProps<PathologyTestProps, MedicalTestProps>
>

export default function PathologyTest(
	{
		tissueSample,
		schemaType = "PathologyTest",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<MedicalTest
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				tissueSample,
				...subtypeProperties,
			}}
		/>
	)
}
