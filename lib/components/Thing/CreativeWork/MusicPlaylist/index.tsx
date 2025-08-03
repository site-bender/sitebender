import type BaseProps from "../../../../types/index.ts"
import type { MusicPlaylist as MusicPlaylistProps } from "../../../../types/index.ts"

import CreativeWork from "../index.tsx"

export type Props = MusicPlaylistProps & BaseProps

export default function MusicPlaylist({
	_type = "MusicPlaylist",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
