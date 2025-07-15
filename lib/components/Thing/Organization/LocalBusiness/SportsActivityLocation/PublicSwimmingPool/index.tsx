import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type PublicSwimmingPoolProps from "../../../../../../types/Thing/PublicSwimmingPool/index.ts"
import type SportsActivityLocationProps from "../../../../../../types/Thing/SportsActivityLocation/index.ts"

import SportsActivityLocation from "./index.tsx"

// PublicSwimmingPool adds no properties to the SportsActivityLocation schema type
export type Props = BaseComponentProps<
	PublicSwimmingPoolProps,
	"PublicSwimmingPool",
	ExtractLevelProps<PublicSwimmingPoolProps, SportsActivityLocationProps>
>

export default function PublicSwimmingPool({
	schemaType = "PublicSwimmingPool",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<SportsActivityLocation
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
