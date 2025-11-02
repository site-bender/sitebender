import type BaseProps from "../../../../../types/index.ts"
import type { UserInteraction as UserInteractionProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = UserInteractionProps & BaseProps

export default function UserInteraction({
	_type = "UserInteraction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
