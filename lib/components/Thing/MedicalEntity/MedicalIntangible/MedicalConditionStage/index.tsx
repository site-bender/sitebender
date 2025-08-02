import type BaseProps from "../../../../../types/index.ts"
import type MedicalConditionStageProps from "../../../../../types/Thing/MedicalEntity/MedicalIntangible/MedicalConditionStage/index.ts"

import MedicalIntangible from "../index.tsx"

export type Props = MedicalConditionStageProps & BaseProps

export default function MedicalConditionStage({
	stageAsNumber,
	subStageSuffix,
	_type = "MedicalConditionStage",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalIntangible
			{...props}
			_type={_type}
			subtypeProperties={{
				stageAsNumber,
				subStageSuffix,
				...subtypeProperties,
			}}
		>
			{children}
		</MedicalIntangible>
	)
}
