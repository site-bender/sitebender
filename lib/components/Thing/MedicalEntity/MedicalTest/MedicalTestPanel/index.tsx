import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MedicalTestProps from "../../../../../types/Thing/MedicalTest/index.ts"
import type MedicalTestPanelProps from "../../../../../types/Thing/MedicalTestPanel/index.ts"

import MedicalTest from "./index.tsx"

export type Props = BaseComponentProps<
	MedicalTestPanelProps,
	"MedicalTestPanel",
	ExtractLevelProps<MedicalTestPanelProps, MedicalTestProps>
>

export default function MedicalTestPanel(
	{
		subTest,
		schemaType = "MedicalTestPanel",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
