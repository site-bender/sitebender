import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type DigitalDocumentPermissionProps from "../../../../types/Thing/DigitalDocumentPermission/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"

import Intangible from "./index.tsx"

export type Props = BaseComponentProps<
	DigitalDocumentPermissionProps,
	"DigitalDocumentPermission",
	ExtractLevelProps<DigitalDocumentPermissionProps, IntangibleProps>
>

export default function DigitalDocumentPermission(
	{
		grantee,
		permissionType,
		schemaType = "DigitalDocumentPermission",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				grantee,
				permissionType,
				...subtypeProperties,
			}}
		/>
	)
}
