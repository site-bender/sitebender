import type BaseProps from "../../../../types/index.ts"
import type { TVSeries as TVSeriesProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = TVSeriesProps & BaseProps

export default function TVSeries({
	_type = "TVSeries",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
