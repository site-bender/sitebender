import type BaseProps from "../../../../../types/index.ts"
import type { MovieClipProps } from "../../../../../types/Thing/CreativeWork/Clip/MovieClip/index.ts"

import Clip from "../index.tsx"

export type Props = MovieClipProps & BaseProps

export default function MovieClip({
	_type = "MovieClip",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Clip
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
