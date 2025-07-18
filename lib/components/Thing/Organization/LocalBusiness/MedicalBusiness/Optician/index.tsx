import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type MedicalBusinessProps from "../../../../../../types/Thing/MedicalBusiness/index.ts"
import type OpticianProps from "../../../../../../types/Thing/Optician/index.ts"

import MedicalBusiness from "../index.tsx"

// Optician adds no properties to the MedicalBusiness schema type
export type Props = BaseComponentProps<
	OpticianProps,
	"Optician",
	ExtractLevelProps<OpticianProps, MedicalBusinessProps>
>

export default function Optician({
	schemaType = "Optician",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<MedicalBusiness
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
