import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../types/Thing/CreativeWork/index.ts"
import type { CreativeWorkSeriesProps } from "../../../../../types/Thing/CreativeWork/CreativeWorkSeries/index.ts"
import type { PodcastSeriesProps } from "../../../../../types/Thing/CreativeWork/CreativeWorkSeries/PodcastSeries/index.ts"

import CreativeWorkSeries from "../index.tsx"

export type Props = BaseComponentProps<
	PodcastSeriesProps,
	"PodcastSeries",
	ExtractLevelProps<ThingProps, CreativeWorkProps, CreativeWorkSeriesProps>
>

export default function PodcastSeries({
	actor,
	webFeed,
	schemaType = "PodcastSeries",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<CreativeWorkSeries
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				actor,
				webFeed,
				...subtypeProperties,
			}}
		/>
	)
}
