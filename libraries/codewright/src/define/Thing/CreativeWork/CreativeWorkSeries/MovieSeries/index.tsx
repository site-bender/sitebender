import type BaseProps from "../../../../../../types/index.ts"
import type { MovieSeries as MovieSeriesProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = MovieSeriesProps & BaseProps

export default function MovieSeries({
	_type = "MovieSeries",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
