import type BaseProps from "../../../../../types/index.ts"
import type { MusicAlbumProductionType as MusicAlbumProductionTypeProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = MusicAlbumProductionTypeProps & BaseProps

export default function MusicAlbumProductionType({
	_type = "MusicAlbumProductionType",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
