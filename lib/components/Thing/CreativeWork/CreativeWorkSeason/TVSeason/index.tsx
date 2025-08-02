import type BaseProps from "../../../../../types/index.ts"
import type TVSeasonProps from "../../../../../types/Thing/CreativeWork/CreativeWorkSeason/TVSeason/index.ts"

import CreativeWorkSeason from "../index.tsx"

export type Props = TVSeasonProps & BaseProps

export default function TVSeason(
	{
		countryOfOrigin,
		partOfTVSeries,
		titleEIDR,
		_type = "TVSeason",
		children,
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWorkSeason
			{...props}
			_type={_type}
			subtypeProperties={{
				countryOfOrigin,
				partOfTVSeries,
				titleEIDR,
				...subtypeProperties,
			}}
		>
			{children}
		</CreativeWorkSeason>
	)
}
