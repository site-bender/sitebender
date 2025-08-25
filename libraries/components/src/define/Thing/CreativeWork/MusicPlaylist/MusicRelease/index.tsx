import type BaseProps from "../../../../../../types/index.ts"
import type { MusicRelease as MusicReleaseProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = MusicReleaseProps & BaseProps

export default function MusicRelease({
	_type = "MusicRelease",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
