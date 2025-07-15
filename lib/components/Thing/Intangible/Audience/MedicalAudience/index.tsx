import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AudienceProps from "../../../../../types/Thing/Audience/index.ts"
import type MedicalAudienceProps from "../../../../../types/Thing/MedicalAudience/index.ts"

import Audience from "./index.tsx"

// MedicalAudience adds no properties to the Audience schema type
export type Props = BaseComponentProps<
	MedicalAudienceProps,
	"MedicalAudience",
	ExtractLevelProps<MedicalAudienceProps, AudienceProps>
>

export default function MedicalAudience({
	schemaType = "MedicalAudience",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Audience
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
