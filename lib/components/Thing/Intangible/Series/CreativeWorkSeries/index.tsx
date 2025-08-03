import type BaseProps from "../../../../../types/index.ts"
import type { CreativeWorkSeries as CreativeWorkSeriesProps } from "../../../../../types/index.ts"

import Series from "../index.tsx"

export type Props = CreativeWorkSeriesProps & BaseProps

export default function CreativeWorkSeries({
	_type = "CreativeWorkSeries",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
