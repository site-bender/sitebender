import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type InfectiousDiseaseProps from "../../../../../types/Thing/InfectiousDisease/index.ts"
import type MedicalConditionProps from "../../../../../types/Thing/MedicalCondition/index.ts"

import MedicalCondition from "../index.tsx"

export type Props = BaseComponentProps<
	InfectiousDiseaseProps,
	"InfectiousDisease",
	ExtractLevelProps<InfectiousDiseaseProps, MedicalConditionProps>
>

export default function InfectiousDisease(
	{
		infectiousAgent,
		infectiousAgentClass,
		transmissionMethod,
		schemaType = "InfectiousDisease",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<MedicalCondition
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				infectiousAgent,
				infectiousAgentClass,
				transmissionMethod,
				...subtypeProperties,
			}}
		/>
	)
}
