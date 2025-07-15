import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AirportProps from "../../../../../types/Thing/Airport/index.ts"
import type CivicStructureProps from "../../../../../types/Thing/CivicStructure/index.ts"

import CivicStructure from "./index.tsx"

export type Props = BaseComponentProps<
	AirportProps,
	"Airport",
	ExtractLevelProps<AirportProps, CivicStructureProps>
>

export default function Airport(
	{
		iataCode,
		icaoCode,
		schemaType = "Airport",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
