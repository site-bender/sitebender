import type BaseProps from "../../../../../../types/index.ts"
import type { WarrantyScope as WarrantyScopeProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = WarrantyScopeProps & BaseProps

export default function WarrantyScope({
	_type = "WarrantyScope",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
