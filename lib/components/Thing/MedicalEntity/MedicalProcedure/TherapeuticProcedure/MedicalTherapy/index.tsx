import type { BaseComponentProps, ExtractLevelProps } from "../../../../../../types/index.ts"
import type ThingProps from "../../../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../../../types/Thing/MedicalEntity/index.ts"
import type { MedicalProcedureProps } from "../../../../../../types/Thing/MedicalEntity/MedicalProcedure/index.ts"
import type { TherapeuticProcedureProps } from "../../../../../../types/Thing/MedicalEntity/MedicalProcedure/TherapeuticProcedure/index.ts"
import type { MedicalTherapyProps } from "../../../../../../types/Thing/MedicalEntity/MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"

import TherapeuticProcedure from "../index.tsx"

export type Props = BaseComponentProps<
	MedicalTherapyProps,
	"MedicalTherapy",
	ExtractLevelProps<ThingProps, MedicalEntityProps, MedicalProcedureProps, TherapeuticProcedureProps>
>

export default function MedicalTherapy({
	contraindication,
	duplicateTherapy,
	seriousAdverseOutcome,
	schemaType = "MedicalTherapy",
	subtypeProperties = {},
	...props
}): Props {
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
