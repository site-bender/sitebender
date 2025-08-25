import type BaseProps from "../../../../../../../types/index.ts"
import type { MusicStore as MusicStoreProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = MusicStoreProps & BaseProps

export default function MusicStore({
	_type = "MusicStore",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
