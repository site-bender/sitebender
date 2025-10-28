import type BaseProps from "../../../../../../types/index.ts"
import type { ChildCare as ChildCareProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = ChildCareProps & BaseProps

export default function ChildCare({
	_type = "ChildCare",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
