import type BaseProps from "../../../../../types/index.ts"
import type { ApplyAction as ApplyActionProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = ApplyActionProps & BaseProps

export default function ApplyAction({
	_type = "ApplyAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
