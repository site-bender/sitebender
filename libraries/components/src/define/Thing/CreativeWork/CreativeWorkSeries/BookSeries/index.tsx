import type BaseProps from "../../../../../../types/index.ts"
import type { BookSeries as BookSeriesProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = BookSeriesProps & BaseProps

export default function BookSeries({
	_type = "BookSeries",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
