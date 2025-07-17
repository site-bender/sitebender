import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type SizeGroupEnumerationProps from "../../../../../../types/Thing/SizeGroupEnumeration/index.ts"
import type WearableSizeGroupEnumerationProps from "../../../../../../types/Thing/WearableSizeGroupEnumeration/index.ts"

import SizeGroupEnumeration from "../index.tsx"

// WearableSizeGroupEnumeration adds no properties to the SizeGroupEnumeration schema type
export type Props = BaseComponentProps<
	WearableSizeGroupEnumerationProps,
	"WearableSizeGroupEnumeration",
	ExtractLevelProps<
		WearableSizeGroupEnumerationProps,
		SizeGroupEnumerationProps
	>
>

export default function WearableSizeGroupEnumeration({
	schemaType = "WearableSizeGroupEnumeration",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<SizeGroupEnumeration
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
