import type BaseProps from "../../../../../types/index.ts"
import type BookSeriesProps from "../../../../../types/Thing/CreativeWork/CreativeWorkSeries/BookSeries/index.ts"

import CreativeWorkSeries from "../index.tsx"

export type Props = BookSeriesProps & BaseProps

export default function BookSeries({
	_type = "BookSeries",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWorkSeries
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</CreativeWorkSeries>
	)
}
