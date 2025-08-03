import type BaseProps from "../../../../types/index.ts"
import type { Movie as MovieProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = MovieProps & BaseProps

export default function Movie({
	_type = "Movie",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
