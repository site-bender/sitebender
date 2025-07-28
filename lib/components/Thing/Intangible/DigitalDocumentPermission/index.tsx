import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { DigitalDocumentPermissionProps } from "../../../../types/Thing/Intangible/DigitalDocumentPermission/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	DigitalDocumentPermissionProps,
	"DigitalDocumentPermission",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

export default function DigitalDocumentPermission({
	grantee,
	permissionType,
	schemaType = "DigitalDocumentPermission",
	subtypeProperties = {},
	...props
}): Props {
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
