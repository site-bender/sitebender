import type BaseProps from "../../../../../../types/index.ts"
import type { PodcastSeries as PodcastSeriesProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = PodcastSeriesProps & BaseProps

export default function PodcastSeries({
	_type = "PodcastSeries",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
