import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AudienceProps from "../../../../../types/Thing/Audience/index.ts"
import type BusinessAudienceProps from "../../../../../types/Thing/BusinessAudience/index.ts"

import Audience from "../index.tsx"

export type Props = BaseComponentProps<
	BusinessAudienceProps,
	"BusinessAudience",
	ExtractLevelProps<BusinessAudienceProps, AudienceProps>
>

export default function BusinessAudience(
	{
		numberOfEmployees,
		yearlyRevenue,
		yearsInOperation,
		schemaType = "BusinessAudience",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
