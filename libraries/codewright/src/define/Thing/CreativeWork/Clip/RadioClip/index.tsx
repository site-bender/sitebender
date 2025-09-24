import type BaseProps from "../../../../../../types/index.ts"
import type { RadioClip as RadioClipProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = RadioClipProps & BaseProps

export default function RadioClip({
	_type = "RadioClip",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
