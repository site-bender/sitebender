import type BaseProps from "../../../../../types/index.ts"
import type { Play as PlayProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = PlayProps & BaseProps

export default function Play({
	_type = "Play",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
