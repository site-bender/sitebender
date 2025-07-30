import type BaseProps from "../../../../../types/index.ts"
import type MusicReleaseFormatTypeProps from "../../../../../types/Thing/Intangible/Enumeration/MusicReleaseFormatType/index.ts"

import Enumeration from "../index.tsx"

export type Props = MusicReleaseFormatTypeProps & BaseProps

export default function MusicReleaseFormatType({
	_type = "MusicReleaseFormatType",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Enumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</Enumeration>
	)
}
