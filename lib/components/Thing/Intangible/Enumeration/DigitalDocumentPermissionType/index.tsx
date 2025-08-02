import type BaseProps from "../../../../../types/index.ts"
import type DigitalDocumentPermissionTypeProps from "../../../../../types/Thing/Intangible/Enumeration/DigitalDocumentPermissionType/index.ts"

import Enumeration from "../index.tsx"

export type Props = DigitalDocumentPermissionTypeProps & BaseProps

export default function DigitalDocumentPermissionType({
	_type = "DigitalDocumentPermissionType",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Enumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</Enumeration>
	)
}
