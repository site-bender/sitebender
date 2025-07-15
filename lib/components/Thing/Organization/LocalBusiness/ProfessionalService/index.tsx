import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type LocalBusinessProps from "../../../../../types/Thing/LocalBusiness/index.ts"
import type ProfessionalServiceProps from "../../../../../types/Thing/ProfessionalService/index.ts"

import LocalBusiness from "./index.tsx"

// ProfessionalService adds no properties to the LocalBusiness schema type
export type Props = BaseComponentProps<
	ProfessionalServiceProps,
	"ProfessionalService",
	ExtractLevelProps<ProfessionalServiceProps, LocalBusinessProps>
>

export default function ProfessionalService({
	schemaType = "ProfessionalService",
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
