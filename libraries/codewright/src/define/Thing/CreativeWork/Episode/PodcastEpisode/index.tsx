import type BaseProps from "../../../../../../types/index.ts"
import type { PodcastEpisode as PodcastEpisodeProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = PodcastEpisodeProps & BaseProps

export default function PodcastEpisode({
	_type = "PodcastEpisode",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
