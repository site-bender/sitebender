import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type MediaManipulationRatingEnumerationProps from "../../../../../types/Thing/MediaManipulationRatingEnumeration/index.ts"

import Enumeration from "../index.tsx"

// MediaManipulationRatingEnumeration adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	MediaManipulationRatingEnumerationProps,
	"MediaManipulationRatingEnumeration",
	ExtractLevelProps<MediaManipulationRatingEnumerationProps, EnumerationProps>
>

export default function MediaManipulationRatingEnumeration({
	schemaType = "MediaManipulationRatingEnumeration",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Enumeration
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
