import type BaseProps from "../../../../../types/index.ts"
import type RadioEpisodeProps from "../../../../../types/Thing/CreativeWork/Episode/RadioEpisode/index.ts"

import Episode from "../index.tsx"

export type Props = RadioEpisodeProps & BaseProps

export default function RadioEpisode({
	_type = "RadioEpisode",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Episode
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</Episode>
	)
}
