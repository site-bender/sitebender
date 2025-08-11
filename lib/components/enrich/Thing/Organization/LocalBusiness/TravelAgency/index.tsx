import type BaseProps from "../../../../../types/index.ts"
import type { TravelAgency as TravelAgencyProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = TravelAgencyProps & BaseProps

export default function TravelAgency({
	_type = "TravelAgency",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
