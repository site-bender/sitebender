import type BaseProps from "../../../../../../types/index.ts"
import type { RefundTypeEnumeration as RefundTypeEnumerationProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = RefundTypeEnumerationProps & BaseProps

export default function RefundTypeEnumeration({
	_type = "RefundTypeEnumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
