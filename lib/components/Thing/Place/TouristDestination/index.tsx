import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type PlaceProps from "../../../../types/Thing/Place/index.ts"
import type TouristDestinationProps from "../../../../types/Thing/TouristDestination/index.ts"

import Place from "../index.tsx"

export type Props = BaseComponentProps<
	TouristDestinationProps,
	"TouristDestination",
	ExtractLevelProps<TouristDestinationProps, PlaceProps>
>

export default function TouristDestination(
	{
		includesAttraction,
		touristType,
		schemaType = "TouristDestination",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Place
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				includesAttraction,
				touristType,
				...subtypeProperties,
			}}
		/>
	)
}
