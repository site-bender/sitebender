import type BaseProps from "../../../../../types/index.ts"
import type { MusicGroup as MusicGroupProps } from "../../../../../types/index.ts"

import PerformingGroup from "../index.tsx"

export type Props = MusicGroupProps & BaseProps

export default function MusicGroup({
	_type = "MusicGroup",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
