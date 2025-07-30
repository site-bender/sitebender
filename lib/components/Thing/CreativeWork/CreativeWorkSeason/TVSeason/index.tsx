import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CreativeWorkSeasonProps from "../../../../../types/Thing/CreativeWorkSeason/index.ts"
import type TVSeasonProps from "../../../../../types/Thing/TVSeason/index.ts"

import CreativeWorkSeason from "../index.tsx"

export type Props = BaseComponentProps<
	TVSeasonProps,
	"TVSeason",
	ExtractLevelProps<TVSeasonProps, CreativeWorkSeasonProps>
>

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
		>{children}</TVSeasonProps>
	)
}
