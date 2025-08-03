import type BaseProps from "../../../../../types/index.ts"
import type { UserLikes as UserLikesProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = UserLikesProps & BaseProps

export default function UserLikes({
	_type = "UserLikes",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
