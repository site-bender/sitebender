import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CivicStructureProps from "../../../../../types/Thing/CivicStructure/index.ts"
import type MusicVenueProps from "../../../../../types/Thing/MusicVenue/index.ts"

import CivicStructure from "./index.tsx"

// MusicVenue adds no properties to the CivicStructure schema type
export type Props = BaseComponentProps<
	MusicVenueProps,
	"MusicVenue",
	ExtractLevelProps<MusicVenueProps, CivicStructureProps>
>

export default function MusicVenue({
	schemaType = "MusicVenue",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<CivicStructure
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
