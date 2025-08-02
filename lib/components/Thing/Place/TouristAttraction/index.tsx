import type BaseProps from "../../../../types/index.ts"
import type TouristAttractionProps from "../../../../types/Thing/Place/TouristAttraction/index.ts"

import Place from "../index.tsx"

export type Props = TouristAttractionProps & BaseProps

export default function TouristAttraction({
	availableLanguage,
	touristType,
	_type = "TouristAttraction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Place
			{...props}
			_type={_type}
			subtypeProperties={{
				availableLanguage,
				touristType,
				...subtypeProperties,
			}}
		>
			{children}
		</Place>
	)
}
