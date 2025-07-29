import type BaseProps from "../../../../../types/index.ts"
import type PodcastSeasonProps from "../../../../../types/Thing/CreativeWork/CreativeWorkSeason/PodcastSeason/index.ts"

import CreativeWorkSeason from "../index.tsx"

export type Props = PodcastSeasonProps & BaseProps

export default function PodcastSeason({
	_type = "PodcastSeason",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWorkSeason
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
