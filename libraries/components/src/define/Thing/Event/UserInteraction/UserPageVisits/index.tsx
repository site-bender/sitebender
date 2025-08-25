import type BaseProps from "../../../../../../types/index.ts"
import type { UserPageVisits as UserPageVisitsProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = UserPageVisitsProps & BaseProps

export default function UserPageVisits({
	_type = "UserPageVisits",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
