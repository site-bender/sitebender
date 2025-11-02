import type BaseProps from "../../../../../types/index.ts"
import type { OnlineBusiness as OnlineBusinessProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = OnlineBusinessProps & BaseProps

export default function OnlineBusiness({
	_type = "OnlineBusiness",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
