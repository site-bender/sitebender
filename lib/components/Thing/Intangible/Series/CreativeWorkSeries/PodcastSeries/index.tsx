import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type CreativeWorkSeriesProps from "../../../../../../types/Thing/CreativeWorkSeries/index.ts"
import type PodcastSeriesProps from "../../../../../../types/Thing/PodcastSeries/index.ts"

import CreativeWorkSeries from "../index.tsx"

export type Props = BaseComponentProps<
	PodcastSeriesProps,
	"PodcastSeries",
	ExtractLevelProps<PodcastSeriesProps, CreativeWorkSeriesProps>
>

export default function PodcastSeries(
	{
		actor,
		webFeed,
		schemaType = "PodcastSeries",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
