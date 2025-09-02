import type BaseProps from "../../../../../../types/index.ts"
import type { UserComments as UserCommentsProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = UserCommentsProps & BaseProps

export default function UserComments({
	_type = "UserComments",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
