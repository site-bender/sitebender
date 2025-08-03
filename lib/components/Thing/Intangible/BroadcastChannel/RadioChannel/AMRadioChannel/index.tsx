import type BaseProps from "../../../../../../types/index.ts"
import type { AMRadioChannel as AMRadioChannelProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = AMRadioChannelProps & BaseProps

export default function AMRadioChannel({
	_type = "AMRadioChannel",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
