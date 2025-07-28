import type BaseProps from "../../../../../../types/index.ts"
import type { MedicalProcedureTypeProps } from "../../../../../../types/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalProcedureType/index.ts"

import MedicalEnumeration from "../index.tsx"

export type Props = MedicalProcedureTypeProps & BaseProps

export default function MedicalProcedureType({
	_type = "MedicalProcedureType",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalEnumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
