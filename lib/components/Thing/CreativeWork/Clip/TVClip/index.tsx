import type BaseProps from "../../../../../types/index.ts"
import type { TVClipProps } from "../../../../../types/Thing/CreativeWork/Clip/TVClip/index.ts"

import Clip from "../index.tsx"

export type Props = TVClipProps & BaseProps

export default function TVClip({
	partOfTVSeries,
	_type = "TVClip",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Clip
			{...props}
			_type={_type}
			subtypeProperties={{
				partOfTVSeries,
				...subtypeProperties,
			}}
		/>
	)
}
