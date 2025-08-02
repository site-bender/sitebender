import type BaseProps from "../../../../../types/index.ts"
import type CreativeWorkSeriesProps from "../../../../../types/Thing/Intangible/Series/CreativeWorkSeries/index.ts"

import Series from "../index.tsx"

export type Props = CreativeWorkSeriesProps & BaseProps

export default function CreativeWorkSeries(
	{
		endDate,
		issn,
		startDate,
		_type = "CreativeWorkSeries",
		children,
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Series
			{...props}
			_type={_type}
			subtypeProperties={{
				endDate,
				issn,
				startDate,
				...subtypeProperties,
			}}
		>
			{children}
		</Series>
	)
}
