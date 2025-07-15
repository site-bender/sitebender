import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type MusicCompositionProps from "../../../../types/Thing/MusicComposition/index.ts"

import CreativeWork from "./index.tsx"

export type Props = BaseComponentProps<
	MusicCompositionProps,
	"MusicComposition",
	ExtractLevelProps<MusicCompositionProps, CreativeWorkProps>
>

export default function MusicComposition(
	{
		composer,
		firstPerformance,
		includedComposition,
		iswcCode,
		lyricist,
		lyrics,
		musicArrangement,
		musicCompositionForm,
		musicalKey,
		recordedAs,
		schemaType = "MusicComposition",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				composer,
				firstPerformance,
				includedComposition,
				iswcCode,
				lyricist,
				lyrics,
				musicArrangement,
				musicCompositionForm,
				musicalKey,
				recordedAs,
				...subtypeProperties,
			}}
		/>
	)
}
