import type BaseProps from "../../../../../../types/index.ts"
import type { PodcastSeason as PodcastSeasonProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = PodcastSeasonProps & BaseProps

export default function PodcastSeason({
	_type = "PodcastSeason",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
