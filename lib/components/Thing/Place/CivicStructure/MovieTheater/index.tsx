import type BaseProps from "../../../../../types/index.ts"
import type { MovieTheater as MovieTheaterProps } from "../../../../../types/index.ts"

import CivicStructure from "../index.tsx"

export type Props = MovieTheaterProps & BaseProps

export default function MovieTheater({
	_type = "MovieTheater",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
