import type BaseProps from "../../../../../../types/index.ts"
import type { MusicReleaseFormatType as MusicReleaseFormatTypeProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = MusicReleaseFormatTypeProps & BaseProps

export default function MusicReleaseFormatType({
	_type = "MusicReleaseFormatType",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
