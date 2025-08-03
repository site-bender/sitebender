import type BaseProps from "../../../../../types/index.ts"
import type { MusicAlbumProductionType as MusicAlbumProductionTypeProps } from "../../../../../types/index.ts"

import Enumeration from "../index.tsx"

export type Props = MusicAlbumProductionTypeProps & BaseProps

export default function MusicAlbumProductionType({
	_type = "MusicAlbumProductionType",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
