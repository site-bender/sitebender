import type BaseProps from "../../../../../../../types/index.ts"
import type NewspaperProps from "../../../../../../../types/Thing/Intangible/Series/CreativeWorkSeries/Periodical/Newspaper/index.ts"

import Periodical from "../index.tsx"

// Newspaper adds no properties to the ListItem schema type
export type Props = NewspaperProps & BaseProps

export default function Newspaper({
	_type = "Newspaper",
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
