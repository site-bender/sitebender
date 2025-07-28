import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { PlaceProps } from "../../../../../types/Thing/Place/index.ts"
import type { CivicStructureProps } from "../../../../../types/Thing/Place/CivicStructure/index.ts"
import type { AirportProps } from "../../../../../types/Thing/Place/CivicStructure/Airport/index.ts"

import CivicStructure from "../index.tsx"

export type Props = BaseComponentProps<
	AirportProps,
	"Airport",
	ExtractLevelProps<ThingProps, PlaceProps, CivicStructureProps>
>

export default function Airport({
	iataCode,
	icaoCode,
	schemaType = "Airport",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<CivicStructure
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				iataCode,
				icaoCode,
				...subtypeProperties,
			}}
		/>
	)
}
