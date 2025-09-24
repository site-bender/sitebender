import type BaseProps from "../../../../../types/index.ts"
import type { PlayAction as PlayActionProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = PlayActionProps & BaseProps

export default function PlayAction({
	_type = "PlayAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
