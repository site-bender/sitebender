import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AccommodationProps from "../../../../../types/Thing/Accommodation/index.ts"
import type CampingPitchProps from "../../../../../types/Thing/CampingPitch/index.ts"

import Accommodation from "../index.tsx"

// CampingPitch adds no properties to the Accommodation schema type
export type Props = BaseComponentProps<
	CampingPitchProps,
	"CampingPitch",
	ExtractLevelProps<CampingPitchProps, AccommodationProps>
>

export default function CampingPitch({
	schemaType = "CampingPitch",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Accommodation
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
