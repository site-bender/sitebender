import type BaseProps from "../../../../../../../types/index.ts"
import type { AcceptAction as AcceptActionProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = AcceptActionProps & BaseProps

export default function AcceptAction({
	_type = "AcceptAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
