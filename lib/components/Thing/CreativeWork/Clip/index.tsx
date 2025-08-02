import type BaseProps from "../../../../types/index.ts"
import type ClipProps from "../../../../types/Thing/CreativeWork/Clip/index.ts"

import CreativeWork from "../index.tsx"

export type Props = ClipProps & BaseProps

export default function Clip({
	actor,
	actors,
	clipNumber,
	director,
	directors,
	endOffset,
	musicBy,
	partOfEpisode,
	partOfSeason,
	partOfSeries,
	startOffset,
	_type = "Clip",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				actor,
				actors,
				clipNumber,
				director,
				directors,
				endOffset,
				musicBy,
				partOfEpisode,
				partOfSeason,
				partOfSeries,
				startOffset,
				...subtypeProperties,
			}}
		>
			{children}
		</CreativeWork>
	)
}
