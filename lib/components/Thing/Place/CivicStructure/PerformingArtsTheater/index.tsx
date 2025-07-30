import type BaseProps from "../../../../../types/index.ts"
import type PerformingArtsTheaterProps from "../../../../../types/Thing/Place/CivicStructure/PerformingArtsTheater/index.ts"

import CivicStructure from "../index.tsx"

export type Props = PerformingArtsTheaterProps & BaseProps

export default function PerformingArtsTheater({
	_type = "PerformingArtsTheater",
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
		>{children}</CivicStructure>
	)
}
