import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../types/Thing/CreativeWork/index.ts"
import type { MusicCompositionProps } from "../../../../types/Thing/CreativeWork/MusicComposition/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	MusicCompositionProps,
	"MusicComposition",
	ExtractLevelProps<ThingProps, CreativeWorkProps>
>

export default function MusicComposition({
	composer,
	firstPerformance,
	includedComposition,
	iswcCode,
	lyricist,
	lyrics,
	musicalKey,
	musicArrangement,
	musicCompositionForm,
	recordedAs,
	schemaType = "MusicComposition",
	subtypeProperties = {},
	...props
}): Props {
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
				musicalKey,
				musicArrangement,
				musicCompositionForm,
				recordedAs,
				...subtypeProperties,
			}}
		/>
	)
}
