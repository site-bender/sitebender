import type BaseProps from "../../../../../../types/index.ts"
import type { WearAction as WearActionProps } from "../../../../../../types/index.ts"

import UseAction from "../index.tsx"

export type Props = WearActionProps & BaseProps

export default function WearAction({
	_type = "WearAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
