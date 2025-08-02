import type BaseProps from "../../../../../types/index.ts"
import type RadioSeasonProps from "../../../../../types/Thing/CreativeWork/CreativeWorkSeason/RadioSeason/index.ts"

import CreativeWorkSeason from "../index.tsx"

export type Props = RadioSeasonProps & BaseProps

export default function RadioSeason({
	_type = "RadioSeason",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWorkSeason
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</CreativeWorkSeason>
	)
}
