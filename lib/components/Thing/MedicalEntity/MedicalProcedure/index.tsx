import type BaseProps from "../../../../types/index.ts"
import type MedicalProcedureProps from "../../../../types/Thing/MedicalEntity/MedicalProcedure/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = MedicalProcedureProps & BaseProps

export default function MedicalProcedure({
	bodyLocation,
	followup,
	howPerformed,
	preparation,
	procedureType,
	status,
	_type = "MedicalProcedure",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalEntity
			{...props}
			_type={_type}
			subtypeProperties={{
				bodyLocation,
				followup,
				howPerformed,
				preparation,
				procedureType,
				status,
				...subtypeProperties,
			}}
		>{children}</MedicalEntity>
	)
}
