import type BaseProps from "../../../../../types/index.ts"
import type { CookAction as CookActionProps } from "../../../../../types/index.ts"

import CreateAction from "../index.tsx"

export type Props = CookActionProps & BaseProps

export default function CookAction({
	_type = "CookAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
