import type BaseProps from "../../../../../../types/index.ts"
import type PeriodicalProps from "../../../../../../types/Thing/Intangible/Series/CreativeWorkSeries/Periodical/index.ts"

import CreativeWorkSeries from "../index.tsx"

// Periodical adds no properties to the ListItem schema type
export type Props = PeriodicalProps & BaseProps

export default function Periodical({
	_type = "Periodical",
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
