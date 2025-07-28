import type BaseProps from "../../../../types/index.ts"
import type { MusicCompositionProps } from "../../../../types/Thing/CreativeWork/MusicComposition/index.ts"

import CreativeWork from "../index.tsx"

export type Props = MusicCompositionProps & BaseProps

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
	_type = "MusicComposition",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
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
