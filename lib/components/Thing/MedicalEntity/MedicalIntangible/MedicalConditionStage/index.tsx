import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../../types/Thing/MedicalEntity/index.ts"
import type { MedicalIntangibleProps } from "../../../../../types/Thing/MedicalEntity/MedicalIntangible/index.ts"
import type { MedicalConditionStageProps } from "../../../../../types/Thing/MedicalEntity/MedicalIntangible/MedicalConditionStage/index.ts"

import MedicalIntangible from "../index.tsx"

export type Props = BaseComponentProps<
	MedicalConditionStageProps,
	"MedicalConditionStage",
	ExtractLevelProps<ThingProps, MedicalEntityProps, MedicalIntangibleProps>
>

export default function MedicalConditionStage({
	stageAsNumber,
	subStageSuffix,
	schemaType = "MedicalConditionStage",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<MedicalIntangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				stageAsNumber,
				subStageSuffix,
				...subtypeProperties,
			}}
		/>
	)
}
