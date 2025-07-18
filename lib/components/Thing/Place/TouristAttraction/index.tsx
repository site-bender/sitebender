import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type PlaceProps from "../../../../types/Thing/Place/index.ts"
import type TouristAttractionProps from "../../../../types/Thing/TouristAttraction/index.ts"

import Place from "../index.tsx"

export type Props = BaseComponentProps<
	TouristAttractionProps,
	"TouristAttraction",
	ExtractLevelProps<TouristAttractionProps, PlaceProps>
>

export default function TouristAttraction(
	{
		availableLanguage,
		touristType,
		schemaType = "TouristAttraction",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Place
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				availableLanguage,
				touristType,
				...subtypeProperties,
			}}
		/>
	)
}
