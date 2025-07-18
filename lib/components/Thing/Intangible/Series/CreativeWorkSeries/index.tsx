import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CreativeWorkSeriesProps from "../../../../../types/Thing/CreativeWorkSeries/index.ts"
import type SeriesProps from "../../../../../types/Thing/Series/index.ts"

import Series from "../index.tsx"

export type Props = BaseComponentProps<
	CreativeWorkSeriesProps,
	"CreativeWorkSeries",
	ExtractLevelProps<CreativeWorkSeriesProps, SeriesProps>
>

export default function CreativeWorkSeries(
	{
		endDate,
		issn,
		startDate,
		schemaType = "CreativeWorkSeries",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Series
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				endDate,
				issn,
				startDate,
				...subtypeProperties,
			}}
		/>
	)
}
