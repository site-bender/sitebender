import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type LocalBusinessProps from "../../../../../types/Thing/LocalBusiness/index.ts"
import type MedicalBusinessProps from "../../../../../types/Thing/MedicalBusiness/index.ts"

import LocalBusiness from "../index.tsx"

// MedicalBusiness adds no properties to the LocalBusiness schema type
export type Props = BaseComponentProps<
	MedicalBusinessProps,
	"MedicalBusiness",
	ExtractLevelProps<MedicalBusinessProps, LocalBusinessProps>
>

export default function MedicalBusiness({
	schemaType = "MedicalBusiness",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<LocalBusiness
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
