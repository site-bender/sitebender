import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { AudienceProps } from "../../../../../types/Thing/Intangible/Audience/index.ts"
import type { EducationalAudienceProps } from "../../../../../types/Thing/Intangible/Audience/EducationalAudience/index.ts"

import Audience from "../index.tsx"

export type Props = BaseComponentProps<
	EducationalAudienceProps,
	"EducationalAudience",
	ExtractLevelProps<ThingProps, IntangibleProps, AudienceProps>
>

export default function EducationalAudience({
	educationalRole,
	schemaType = "EducationalAudience",
	subtypeProperties = {},
	...props
}): Props {
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
