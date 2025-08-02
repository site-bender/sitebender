import type BaseProps from "../../../../../types/index.ts"
import type CampgroundProps from "../../../../../types/Thing/Place/CivicStructure/Campground/index.ts"

import CivicStructure from "../index.tsx"

export type Props = CampgroundProps & BaseProps

export default function Campground({
	_type = "Campground",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CivicStructure
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</CivicStructure>
	)
}
