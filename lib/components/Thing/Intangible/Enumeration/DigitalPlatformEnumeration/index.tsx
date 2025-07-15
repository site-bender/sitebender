import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type DigitalPlatformEnumerationProps from "../../../../../types/Thing/DigitalPlatformEnumeration/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"

import Enumeration from "./index.tsx"

// DigitalPlatformEnumeration adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	DigitalPlatformEnumerationProps,
	"DigitalPlatformEnumeration",
	ExtractLevelProps<DigitalPlatformEnumerationProps, EnumerationProps>
>

export default function DigitalPlatformEnumeration({
	schemaType = "DigitalPlatformEnumeration",
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
