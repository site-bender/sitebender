import type BaseProps from "../../../../../types/index.ts"
import type MuseumProps from "../../../../../types/Thing/Place/CivicStructure/Museum/index.ts"

import CivicStructure from "../index.tsx"

export type Props = MuseumProps & BaseProps

export default function Museum({
	_type = "Museum",
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
