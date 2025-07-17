import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type MedicalEntityProps from "../../../../types/Thing/MedicalEntity/index.ts"
import type MedicalProcedureProps from "../../../../types/Thing/MedicalProcedure/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = BaseComponentProps<
	MedicalProcedureProps,
	"MedicalProcedure",
	ExtractLevelProps<MedicalProcedureProps, MedicalEntityProps>
>

export default function MedicalProcedure(
	{
		bodyLocation,
		followup,
		howPerformed,
		preparation,
		procedureType,
		status,
		schemaType = "MedicalProcedure",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<MedicalEntity
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				bodyLocation,
				followup,
				howPerformed,
				preparation,
				procedureType,
				status,
				...subtypeProperties,
			}}
		/>
	)
}
