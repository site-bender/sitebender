import type BaseProps from "../../../../../../types/index.ts"
import type BookSeriesProps from "../../../../../../types/Thing/Intangible/Series/CreativeWorkSeries/BookSeries/index.ts"

import CreativeWorkSeries from "../index.tsx"

// BookSeries adds no properties to the ListItem schema type
export type Props = BookSeriesProps & BaseProps

export default function BookSeries({
	_type = "BookSeries",
	children,
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<CreativeWorkSeries
			{...props}
			_type={_type}
			subtypeProperties={subtypeProperties}
		>
			{children}
		</CreativeWorkSeries>
	)
}
