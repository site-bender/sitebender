import type { BaseComponentProps, ExtractLevelProps } from "../../../types/index.ts"
import type ThingProps from "../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../types/Thing/MedicalEntity/index.ts"

import Thing from "../index.tsx"

export type Props = BaseComponentProps<
	MedicalEntityProps,
	"MedicalEntity",
	ExtractLevelProps<ThingProps>
>

export default function MedicalEntity({
	code,
	funding,
	guideline,
	legalStatus,
	medicineSystem,
	recognizingAuthority,
	relevantSpecialty,
	study,
	schemaType = "MedicalEntity",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Thing
			{...props}
			schemaType={schemaType}
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
