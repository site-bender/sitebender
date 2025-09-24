import type BaseProps from "../../../../../../types/index.ts"
import type { TelevisionChannel as TelevisionChannelProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = TelevisionChannelProps & BaseProps

export default function TelevisionChannel({
	_type = "TelevisionChannel",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
