import type BaseProps from "../../../../../../types/index.ts"
import type PodcastSeriesProps from "../../../../../../types/Thing/Intangible/Series/CreativeWorkSeries/PodcastSeries/index.ts"

import CreativeWorkSeries from "../index.tsx"

// PodcastSeries adds no properties to the ListItem schema type
export type Props = PodcastSeriesProps & BaseProps

export default function PodcastSeries(
	{
		actor,
		webFeed,
		_type = "PodcastSeries",
		children,
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWorkSeries
			{...props}
			_type={_type}
			subtypeProperties={{
				actor,
				webFeed,
				...subtypeProperties,
			}}
		>
			{children}
		</CreativeWorkSeries>
	)
}
