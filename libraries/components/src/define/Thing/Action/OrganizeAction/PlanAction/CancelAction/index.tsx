import type BaseProps from "../../../../../../../types/index.ts"
import type { CancelAction as CancelActionProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = CancelActionProps & BaseProps

export default function CancelAction({
	_type = "CancelAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
