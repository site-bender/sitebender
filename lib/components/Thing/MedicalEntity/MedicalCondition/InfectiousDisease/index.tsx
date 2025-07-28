import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../../types/Thing/MedicalEntity/index.ts"
import type { MedicalConditionProps } from "../../../../../types/Thing/MedicalEntity/MedicalCondition/index.ts"
import type { InfectiousDiseaseProps } from "../../../../../types/Thing/MedicalEntity/MedicalCondition/InfectiousDisease/index.ts"

import MedicalCondition from "../index.tsx"

export type Props = BaseComponentProps<
	InfectiousDiseaseProps,
	"InfectiousDisease",
	ExtractLevelProps<ThingProps, MedicalEntityProps, MedicalConditionProps>
>

export default function InfectiousDisease({
	infectiousAgent,
	infectiousAgentClass,
	transmissionMethod,
	schemaType = "InfectiousDisease",
	subtypeProperties = {},
	...props
}): Props {
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
