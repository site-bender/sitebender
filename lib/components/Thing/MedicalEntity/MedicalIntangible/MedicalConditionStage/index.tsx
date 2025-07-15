import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MedicalConditionStageProps from "../../../../../types/Thing/MedicalConditionStage/index.ts"
import type MedicalIntangibleProps from "../../../../../types/Thing/MedicalIntangible/index.ts"

import MedicalIntangible from "./index.tsx"

export type Props = BaseComponentProps<
	MedicalConditionStageProps,
	"MedicalConditionStage",
	ExtractLevelProps<MedicalConditionStageProps, MedicalIntangibleProps>
>

export default function MedicalConditionStage(
	{
		stageAsNumber,
		subStageSuffix,
		schemaType = "MedicalConditionStage",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
