import type BaseProps from "../../../../../types/index.ts"
import type MediaManipulationRatingEnumerationProps from "../../../../../types/Thing/Intangible/Enumeration/MediaManipulationRatingEnumeration/index.ts"

import Enumeration from "../index.tsx"

export type Props = MediaManipulationRatingEnumerationProps & BaseProps

export default function MediaManipulationRatingEnumeration({
	_type = "MediaManipulationRatingEnumeration",
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
