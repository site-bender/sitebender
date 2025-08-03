import type BaseProps from "../../../../types/index.ts"
import type { Episode as EpisodeProps } from "../../../../types/index.ts"

import CreativeWork from "../index.tsx"

export type Props = EpisodeProps & BaseProps

export default function Episode({
	_type = "Episode",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
