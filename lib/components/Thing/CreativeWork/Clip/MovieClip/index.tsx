import type BaseProps from "../../../../../types/index.ts"
import type { MovieClip as MovieClipProps } from "../../../../../types/index.ts"

import Clip from "../index.tsx"

export type Props = MovieClipProps & BaseProps

export default function MovieClip({
	_type = "MovieClip",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
