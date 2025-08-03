import type BaseProps from "../../../../../types/index.ts"
import type { MusicAlbumReleaseType as MusicAlbumReleaseTypeProps } from "../../../../../types/index.ts"

import Enumeration from "../index.tsx"

export type Props = MusicAlbumReleaseTypeProps & BaseProps

export default function MusicAlbumReleaseType({
	_type = "MusicAlbumReleaseType",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
