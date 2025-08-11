import type BaseProps from "../../../../../types/index.ts"
import type { RadioStation as RadioStationProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = RadioStationProps & BaseProps

export default function RadioStation({
	_type = "RadioStation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
