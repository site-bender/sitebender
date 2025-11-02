import type BaseProps from "../../../../../types/index.ts"
import type { Invoice as InvoiceProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = InvoiceProps & BaseProps

export default function Invoice({
	_type = "Invoice",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
