import type BaseProps from "../../../../../../../types/index.ts"
import type { ComicSeries as ComicSeriesProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = ComicSeriesProps & BaseProps

export default function ComicSeries({
	_type = "ComicSeries",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
