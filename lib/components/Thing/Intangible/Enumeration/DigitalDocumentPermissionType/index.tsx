import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type DigitalDocumentPermissionTypeProps from "../../../../../types/Thing/DigitalDocumentPermissionType/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"

import Enumeration from "./index.tsx"

// DigitalDocumentPermissionType adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	DigitalDocumentPermissionTypeProps,
	"DigitalDocumentPermissionType",
	ExtractLevelProps<DigitalDocumentPermissionTypeProps, EnumerationProps>
>

export default function DigitalDocumentPermissionType({
	schemaType = "DigitalDocumentPermissionType",
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
