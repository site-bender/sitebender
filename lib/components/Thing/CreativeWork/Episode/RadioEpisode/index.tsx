import type BaseProps from "../../../../../types/index.ts"
import type { RadioEpisode as RadioEpisodeProps } from "../../../../../types/index.ts"

import Episode from "../index.tsx"

export type Props = RadioEpisodeProps & BaseProps

export default function RadioEpisode({
	_type = "RadioEpisode",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
