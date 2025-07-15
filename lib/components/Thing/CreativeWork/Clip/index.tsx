import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type ClipProps from "../../../../types/Thing/Clip/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"

import CreativeWork from "./index.tsx"

export type Props = BaseComponentProps<
	ClipProps,
	"Clip",
	ExtractLevelProps<ClipProps, CreativeWorkProps>
>

export default function Clip(
	{
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
		schemaType = "Clip",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
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
		/>
	)
}
