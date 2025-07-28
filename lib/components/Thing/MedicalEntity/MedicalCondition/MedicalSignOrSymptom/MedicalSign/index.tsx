import type BaseProps from "../../../../../../types/index.ts"
import type { MedicalSignProps } from "../../../../../../types/Thing/MedicalEntity/MedicalCondition/MedicalSignOrSymptom/MedicalSign/index.ts"

import MedicalSignOrSymptom from "../index.tsx"

export type Props = MedicalSignProps & BaseProps

export default function MedicalSign({
	identifyingExam,
	identifyingTest,
	_type = "MedicalSign",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalSignOrSymptom
			{...props}
			_type={_type}
			subtypeProperties={{
				identifyingExam,
				identifyingTest,
				...subtypeProperties,
			}}
		/>
	)
}
