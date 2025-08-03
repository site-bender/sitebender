import type BaseProps from "../../../../../types/index.ts"
import type { ViewAction as ViewActionProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = ViewActionProps & BaseProps

export default function ViewAction({
	_type = "ViewAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
