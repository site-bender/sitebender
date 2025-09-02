import type BaseProps from "../../../../../../types/index.ts"
import type { VideoGameSeries as VideoGameSeriesProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = VideoGameSeriesProps & BaseProps

export default function VideoGameSeries({
	_type = "VideoGameSeries",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
