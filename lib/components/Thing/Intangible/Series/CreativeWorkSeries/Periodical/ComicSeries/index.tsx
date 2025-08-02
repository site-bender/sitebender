import type BaseProps from "../../../../../../../types/index.ts"
import type ComicSeriesProps from "../../../../../../../types/Thing/Intangible/Series/CreativeWorkSeries/Periodical/ComicSeries/index.ts"

import Periodical from "../index.tsx"

// ComicSeries adds no properties to the ListItem schema type
export type Props = ComicSeriesProps & BaseProps

export default function ComicSeries({
	_type = "ComicSeries",
	children,
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Periodical
			{...props}
			_type={_type}
			subtypeProperties={subtypeProperties}
		>
			{children}
		</Periodical>
	)
}
