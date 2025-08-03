import type BaseProps from "../../../../../types/index.ts"
import type { PurchaseType as PurchaseTypeProps } from "../../../../../types/index.ts"

import Enumeration from "../index.tsx"

export type Props = PurchaseTypeProps & BaseProps

export default function PurchaseType({
	_type = "PurchaseType",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
