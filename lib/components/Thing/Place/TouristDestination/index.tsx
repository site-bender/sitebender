import type BaseProps from "../../../../types/index.ts"
import type { TouristDestinationProps } from "../../../../types/Thing/Place/TouristDestination/index.ts"

import Place from "../index.tsx"

export type Props = TouristDestinationProps & BaseProps

export default function TouristDestination({
	includesAttraction,
	touristType,
	_type = "TouristDestination",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Place
			{...props}
			_type={_type}
			subtypeProperties={{
				includesAttraction,
				touristType,
				...subtypeProperties,
			}}
		/>
	)
}
