import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type MedicalDeviceProps from "../../../../types/Thing/MedicalDevice/index.ts"
import type MedicalEntityProps from "../../../../types/Thing/MedicalEntity/index.ts"

import MedicalEntity from "./index.tsx"

export type Props = BaseComponentProps<
	MedicalDeviceProps,
	"MedicalDevice",
	ExtractLevelProps<MedicalDeviceProps, MedicalEntityProps>
>

export default function MedicalDevice(
	{
		adverseOutcome,
		contraindication,
		postOp,
		preOp,
		procedure,
		seriousAdverseOutcome,
		schemaType = "MedicalDevice",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<MedicalEntity
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				adverseOutcome,
				contraindication,
				postOp,
				preOp,
				procedure,
				seriousAdverseOutcome,
				...subtypeProperties,
			}}
		/>
	)
}
