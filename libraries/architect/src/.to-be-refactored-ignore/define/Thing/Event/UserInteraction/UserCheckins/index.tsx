import type BaseProps from "../../../../../../types/index.ts"
import type { UserCheckins as UserCheckinsProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = UserCheckinsProps & BaseProps

export default function UserCheckins({
	_type = "UserCheckins",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
