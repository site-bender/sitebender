import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type IPTCDigitalSourceEnumerationProps from "../../../../../../types/Thing/IPTCDigitalSourceEnumeration/index.ts"
import type MediaEnumerationProps from "../../../../../../types/Thing/MediaEnumeration/index.ts"

import MediaEnumeration from "../index.tsx"

// IPTCDigitalSourceEnumeration adds no properties to the MediaEnumeration schema type
export type Props = BaseComponentProps<
	IPTCDigitalSourceEnumerationProps,
	"IPTCDigitalSourceEnumeration",
	ExtractLevelProps<IPTCDigitalSourceEnumerationProps, MediaEnumerationProps>
>

export default function IPTCDigitalSourceEnumeration({
	schemaType = "IPTCDigitalSourceEnumeration",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<MediaEnumeration
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
