import type BaseProps from "../../../../types/index.ts"
import type { DigitalDocumentPermissionProps } from "../../../../types/Thing/Intangible/DigitalDocumentPermission/index.ts"

import Intangible from "../index.tsx"

export type Props = DigitalDocumentPermissionProps & BaseProps

export default function DigitalDocumentPermission({
	grantee,
	permissionType,
	_type = "DigitalDocumentPermission",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				grantee,
				permissionType,
				...subtypeProperties,
			}}
		/>
	)
}
