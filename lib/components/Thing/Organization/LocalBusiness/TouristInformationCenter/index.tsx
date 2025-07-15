import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type LocalBusinessProps from "../../../../../types/Thing/LocalBusiness/index.ts"
import type TouristInformationCenterProps from "../../../../../types/Thing/TouristInformationCenter/index.ts"

import LocalBusiness from "./index.tsx"

// TouristInformationCenter adds no properties to the LocalBusiness schema type
export type Props = BaseComponentProps<
	TouristInformationCenterProps,
	"TouristInformationCenter",
	ExtractLevelProps<TouristInformationCenterProps, LocalBusinessProps>
>

export default function TouristInformationCenter({
	schemaType = "TouristInformationCenter",
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
