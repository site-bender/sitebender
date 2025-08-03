import type BaseProps from "../../../../../types/index.ts"
import type { TVEpisode as TVEpisodeProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = TVEpisodeProps & BaseProps

export default function TVEpisode({
	_type = "TVEpisode",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
