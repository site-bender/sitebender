import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type DrugLegalStatusProps from "../../../../../types/Thing/DrugLegalStatus/index.ts"
import type MedicalIntangibleProps from "../../../../../types/Thing/MedicalIntangible/index.ts"

import MedicalIntangible from "../index.tsx"

export type Props = BaseComponentProps<
	DrugLegalStatusProps,
	"DrugLegalStatus",
	ExtractLevelProps<DrugLegalStatusProps, MedicalIntangibleProps>
>

export default function DrugLegalStatus(
	{
		applicableLocation,
		schemaType = "DrugLegalStatus",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
