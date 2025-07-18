import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type LocalBusinessProps from "../../../../../types/Thing/LocalBusiness/index.ts"
import type TravelAgencyProps from "../../../../../types/Thing/TravelAgency/index.ts"

import LocalBusiness from "../index.tsx"

// TravelAgency adds no properties to the LocalBusiness schema type
export type Props = BaseComponentProps<
	TravelAgencyProps,
	"TravelAgency",
	ExtractLevelProps<TravelAgencyProps, LocalBusinessProps>
>

export default function TravelAgency({
	schemaType = "TravelAgency",
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
