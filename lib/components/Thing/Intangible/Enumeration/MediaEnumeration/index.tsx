import type BaseProps from "../../../../../types/index.ts"
import type MediaEnumerationProps from "../../../../../types/Thing/Intangible/Enumeration/MediaEnumeration/index.ts"

import Enumeration from "../index.tsx"

export type Props = MediaEnumerationProps & BaseProps

export default function MediaEnumeration({
	_type = "MediaEnumeration",
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
