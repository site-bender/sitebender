import type BaseProps from "../../../../../types/index.ts"
import type { RadioChannel as RadioChannelProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = RadioChannelProps & BaseProps

export default function RadioChannel({
	_type = "RadioChannel",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
