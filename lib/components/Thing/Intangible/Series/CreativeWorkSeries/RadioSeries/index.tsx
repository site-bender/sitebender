import type BaseProps from "../../../../../../types/index.ts"
import type { RadioSeries as RadioSeriesProps } from "../../../../../../types/index.ts"

import CreativeWorkSeries from "../index.tsx"

// RadioSeries adds no properties to the ListItem schema type
export type Props = RadioSeriesProps & BaseProps

export default function RadioSeries({
	_type = "RadioSeries",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
