import type BaseProps from "../../../../../types/index.ts"
import type PodcastSeriesProps from "../../../../../types/Thing/CreativeWork/CreativeWorkSeries/PodcastSeries/index.ts"

import CreativeWorkSeries from "../index.tsx"

export type Props = PodcastSeriesProps & BaseProps

export default function PodcastSeries({
	actor,
	webFeed,
	_type = "PodcastSeries",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWorkSeries
			{...props}
			_type={_type}
			subtypeProperties={{
				actor,
				webFeed,
				...subtypeProperties,
			}}
		/>
	)
}
