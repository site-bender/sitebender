import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type LocalBusinessProps from "../../../../../types/Thing/LocalBusiness/index.ts"
import type RecyclingCenterProps from "../../../../../types/Thing/RecyclingCenter/index.ts"

import LocalBusiness from "./index.tsx"

// RecyclingCenter adds no properties to the LocalBusiness schema type
export type Props = BaseComponentProps<
	RecyclingCenterProps,
	"RecyclingCenter",
	ExtractLevelProps<RecyclingCenterProps, LocalBusinessProps>
>

export default function RecyclingCenter({
	schemaType = "RecyclingCenter",
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
