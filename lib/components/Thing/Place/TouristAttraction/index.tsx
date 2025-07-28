import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { PlaceProps } from "../../../../types/Thing/Place/index.ts"
import type { TouristAttractionProps } from "../../../../types/Thing/Place/TouristAttraction/index.ts"

import Place from "../index.tsx"

export type Props = BaseComponentProps<
	TouristAttractionProps,
	"TouristAttraction",
	ExtractLevelProps<ThingProps, PlaceProps>
>

export default function TouristAttraction({
	availableLanguage,
	touristType,
	schemaType = "TouristAttraction",
	subtypeProperties = {},
	...props
}): Props {
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
