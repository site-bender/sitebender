import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type LocalBusinessProps from "../../../../../types/Thing/LocalBusiness/index.ts"
import type RealEstateAgentProps from "../../../../../types/Thing/RealEstateAgent/index.ts"

import LocalBusiness from "../index.tsx"

// RealEstateAgent adds no properties to the LocalBusiness schema type
export type Props = BaseComponentProps<
	RealEstateAgentProps,
	"RealEstateAgent",
	ExtractLevelProps<RealEstateAgentProps, LocalBusinessProps>
>

export default function RealEstateAgent({
	schemaType = "RealEstateAgent",
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
