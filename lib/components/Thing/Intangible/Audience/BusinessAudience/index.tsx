import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { AudienceProps } from "../../../../../types/Thing/Intangible/Audience/index.ts"
import type { BusinessAudienceProps } from "../../../../../types/Thing/Intangible/Audience/BusinessAudience/index.ts"

import Audience from "../index.tsx"

export type Props = BaseComponentProps<
	BusinessAudienceProps,
	"BusinessAudience",
	ExtractLevelProps<ThingProps, IntangibleProps, AudienceProps>
>

export default function BusinessAudience({
	numberOfEmployees,
	yearlyRevenue,
	yearsInOperation,
	schemaType = "BusinessAudience",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Audience
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				numberOfEmployees,
				yearlyRevenue,
				yearsInOperation,
				...subtypeProperties,
			}}
		/>
	)
}
