import type BaseProps from "../../../../../types/index.ts"
import type { TVClip as TVClipProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = TVClipProps & BaseProps

export default function TVClip({
	_type = "TVClip",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
