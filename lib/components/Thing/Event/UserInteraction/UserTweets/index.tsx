import type BaseProps from "../../../../../types/index.ts"
import type { UserTweets as UserTweetsProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = UserTweetsProps & BaseProps

export default function UserTweets({
	_type = "UserTweets",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
