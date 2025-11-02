import type BaseProps from "../../../../../../../types/index.ts"
import type { InviteAction as InviteActionProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = InviteActionProps & BaseProps

export default function InviteAction({
	_type = "InviteAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
