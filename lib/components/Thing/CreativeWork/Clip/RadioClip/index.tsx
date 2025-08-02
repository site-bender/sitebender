import type BaseProps from "../../../../../types/index.ts"
import type RadioClipProps from "../../../../../types/Thing/CreativeWork/Clip/RadioClip/index.ts"

import Clip from "../index.tsx"

export type Props = RadioClipProps & BaseProps

export default function RadioClip({
	_type = "RadioClip",
	children,
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
		>
			{children}
		</Clip>
	)
}
