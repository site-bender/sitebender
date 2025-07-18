import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type SizeSystemEnumerationProps from "../../../../../../types/Thing/SizeSystemEnumeration/index.ts"
import type WearableSizeSystemEnumerationProps from "../../../../../../types/Thing/WearableSizeSystemEnumeration/index.ts"

import SizeSystemEnumeration from "../index.tsx"

// WearableSizeSystemEnumeration adds no properties to the SizeSystemEnumeration schema type
export type Props = BaseComponentProps<
	WearableSizeSystemEnumerationProps,
	"WearableSizeSystemEnumeration",
	ExtractLevelProps<
		WearableSizeSystemEnumerationProps,
		SizeSystemEnumerationProps
	>
>

export default function WearableSizeSystemEnumeration({
	schemaType = "WearableSizeSystemEnumeration",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<SizeSystemEnumeration
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
