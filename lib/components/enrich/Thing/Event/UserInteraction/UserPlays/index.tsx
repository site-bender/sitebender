import type BaseProps from "../../../../../types/index.ts"
import type { UserPlays as UserPlaysProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = UserPlaysProps & BaseProps

export default function UserPlays({
	_type = "UserPlays",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
