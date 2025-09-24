import type BaseProps from "../../../../../../types/index.ts"
import type { StatusEnumeration as StatusEnumerationProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = StatusEnumerationProps & BaseProps

export default function StatusEnumeration({
	_type = "StatusEnumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
