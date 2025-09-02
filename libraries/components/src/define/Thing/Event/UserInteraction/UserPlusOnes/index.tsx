import type BaseProps from "../../../../../../types/index.ts"
import type { UserPlusOnes as UserPlusOnesProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = UserPlusOnesProps & BaseProps

export default function UserPlusOnes({
	_type = "UserPlusOnes",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
