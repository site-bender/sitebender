import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../../types/Thing/MedicalEntity/index.ts"
import type { MedicalTestProps } from "../../../../../types/Thing/MedicalEntity/MedicalTest/index.ts"
import type { PathologyTestProps } from "../../../../../types/Thing/MedicalEntity/MedicalTest/PathologyTest/index.ts"

import MedicalTest from "../index.tsx"

export type Props = BaseComponentProps<
	PathologyTestProps,
	"PathologyTest",
	ExtractLevelProps<ThingProps, MedicalEntityProps, MedicalTestProps>
>

export default function PathologyTest({
	tissueSample,
	schemaType = "PathologyTest",
	subtypeProperties = {},
	...props
}): Props {
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
