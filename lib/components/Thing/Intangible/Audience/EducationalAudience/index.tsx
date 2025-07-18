import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AudienceProps from "../../../../../types/Thing/Audience/index.ts"
import type EducationalAudienceProps from "../../../../../types/Thing/EducationalAudience/index.ts"

import Audience from "../index.tsx"

export type Props = BaseComponentProps<
	EducationalAudienceProps,
	"EducationalAudience",
	ExtractLevelProps<EducationalAudienceProps, AudienceProps>
>

export default function EducationalAudience(
	{
		educationalRole,
		schemaType = "EducationalAudience",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Audience
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				educationalRole,
				...subtypeProperties,
			}}
		/>
	)
}
