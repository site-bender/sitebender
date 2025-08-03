import type BaseProps from "../../../../../types/index.ts"
import type { VideoGame as VideoGameProps } from "../../../../../types/index.ts"

import Game from "../index.tsx"

export type Props = VideoGameProps & BaseProps

export default function VideoGame({
	_type = "VideoGame",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
