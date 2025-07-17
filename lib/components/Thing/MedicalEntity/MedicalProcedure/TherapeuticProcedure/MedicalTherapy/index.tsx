import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type MedicalTherapyProps from "../../../../../../types/Thing/MedicalTherapy/index.ts"
import type TherapeuticProcedureProps from "../../../../../../types/Thing/TherapeuticProcedure/index.ts"

import TherapeuticProcedure from "../index.tsx"

export type Props = BaseComponentProps<
	MedicalTherapyProps,
	"MedicalTherapy",
	ExtractLevelProps<MedicalTherapyProps, TherapeuticProcedureProps>
>

export default function MedicalTherapy(
	{
		contraindication,
		duplicateTherapy,
		seriousAdverseOutcome,
		schemaType = "MedicalTherapy",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<TherapeuticProcedure
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				contraindication,
				duplicateTherapy,
				seriousAdverseOutcome,
				...subtypeProperties,
			}}
		/>
	)
}
