import type BaseProps from "../../../../../types/index.ts"
import type { RealEstateAgent as RealEstateAgentProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = RealEstateAgentProps & BaseProps

export default function RealEstateAgent({
	_type = "RealEstateAgent",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
