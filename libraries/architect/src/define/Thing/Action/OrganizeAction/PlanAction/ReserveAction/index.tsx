import type BaseProps from "../../../../../../../types/index.ts"
import type { ReserveAction as ReserveActionProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = ReserveActionProps & BaseProps

export default function ReserveAction({
	_type = "ReserveAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
