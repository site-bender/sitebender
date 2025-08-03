import type BaseProps from "../../../../../types/index.ts"
import type { DigitalDocumentPermissionType as DigitalDocumentPermissionTypeProps } from "../../../../../types/index.ts"

import Enumeration from "../index.tsx"

export type Props = DigitalDocumentPermissionTypeProps & BaseProps

export default function DigitalDocumentPermissionType({
	_type = "DigitalDocumentPermissionType",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
