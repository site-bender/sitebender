import type BaseProps from "../../../../../types/index.ts"
import type { TouristDestination as TouristDestinationProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = TouristDestinationProps & BaseProps

export default function TouristDestination({
	_type = "TouristDestination",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
