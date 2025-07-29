import type BaseProps from "../../../types/index.ts"
import type MedicalEntityProps from "../../../types/Thing/MedicalEntity/index.ts"

import Thing from "../index.tsx"

export type Props = MedicalEntityProps & BaseProps

export default function MedicalEntity({
	code,
	funding,
	guideline,
	legalStatus,
	medicineSystem,
	recognizingAuthority,
	relevantSpecialty,
	study,
	_type = "MedicalEntity",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Thing
			{...props}
			_type={_type}
			subtypeProperties={{
				code,
				funding,
				guideline,
				legalStatus,
				medicineSystem,
				recognizingAuthority,
				relevantSpecialty,
				study,
				...subtypeProperties,
			}}
		/>
	)
}
