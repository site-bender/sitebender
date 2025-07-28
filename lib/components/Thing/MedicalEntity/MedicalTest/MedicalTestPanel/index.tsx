import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../../types/Thing/MedicalEntity/index.ts"
import type { MedicalTestProps } from "../../../../../types/Thing/MedicalEntity/MedicalTest/index.ts"
import type { MedicalTestPanelProps } from "../../../../../types/Thing/MedicalEntity/MedicalTest/MedicalTestPanel/index.ts"

import MedicalTest from "../index.tsx"

export type Props = BaseComponentProps<
	MedicalTestPanelProps,
	"MedicalTestPanel",
	ExtractLevelProps<ThingProps, MedicalEntityProps, MedicalTestProps>
>

export default function MedicalTestPanel({
	subTest,
	schemaType = "MedicalTestPanel",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<MedicalTest
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				subTest,
				...subtypeProperties,
			}}
		/>
	)
}
