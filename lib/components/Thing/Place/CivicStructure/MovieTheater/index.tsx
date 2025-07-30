import type BaseProps from "../../../../../types/index.ts"
import type MovieTheaterProps from "../../../../../types/Thing/Place/CivicStructure/MovieTheater/index.ts"

import CivicStructure from "../index.tsx"

export type Props = MovieTheaterProps & BaseProps

export default function MovieTheater({
	screenCount,
	_type = "MovieTheater",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CivicStructure
			{...props}
			_type={_type}
			subtypeProperties={{
				screenCount,
				...subtypeProperties,
			}}
		>{children}</CivicStructure>
	)
}
