import type BaseProps from "../../../../../types/index.ts"
import type { DigitalDocumentPermission as DigitalDocumentPermissionProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = DigitalDocumentPermissionProps & BaseProps

export default function DigitalDocumentPermission({
	_type = "DigitalDocumentPermission",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
