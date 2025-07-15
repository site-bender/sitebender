import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type MediaEnumerationProps from "../../../../../types/Thing/MediaEnumeration/index.ts"

import Enumeration from "./index.tsx"

// MediaEnumeration adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	MediaEnumerationProps,
	"MediaEnumeration",
	ExtractLevelProps<MediaEnumerationProps, EnumerationProps>
>

export default function MediaEnumeration({
	schemaType = "MediaEnumeration",
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
