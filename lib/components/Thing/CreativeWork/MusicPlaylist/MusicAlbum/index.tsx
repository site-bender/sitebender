import type BaseProps from "../../../../../types/index.ts"
import type { MusicAlbum as MusicAlbumProps } from "../../../../../types/index.ts"

import MusicPlaylist from "../index.tsx"

export type Props = MusicAlbumProps & BaseProps

export default function MusicAlbum({
	_type = "MusicAlbum",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
