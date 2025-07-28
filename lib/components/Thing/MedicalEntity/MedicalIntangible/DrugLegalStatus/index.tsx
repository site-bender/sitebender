import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../../types/Thing/MedicalEntity/index.ts"
import type { MedicalIntangibleProps } from "../../../../../types/Thing/MedicalEntity/MedicalIntangible/index.ts"
import type { DrugLegalStatusProps } from "../../../../../types/Thing/MedicalEntity/MedicalIntangible/DrugLegalStatus/index.ts"

import MedicalIntangible from "../index.tsx"

export type Props = BaseComponentProps<
	DrugLegalStatusProps,
	"DrugLegalStatus",
	ExtractLevelProps<ThingProps, MedicalEntityProps, MedicalIntangibleProps>
>

export default function DrugLegalStatus({
	applicableLocation,
	schemaType = "DrugLegalStatus",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<MedicalIntangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				applicableLocation,
				...subtypeProperties,
			}}
		/>
	)
}
