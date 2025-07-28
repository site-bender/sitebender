import type BaseProps from "../../../../../../../types/index.ts"
import type { RadiationTherapyProps } from "../../../../../../../types/Thing/MedicalEntity/MedicalProcedure/TherapeuticProcedure/MedicalTherapy/RadiationTherapy/index.ts"

import MedicalTherapy from "../index.tsx"

export type Props = RadiationTherapyProps & BaseProps

export default function RadiationTherapy({
	_type = "RadiationTherapy",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalTherapy
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
