import type BaseProps from "../../../../../types/index.ts"
import type { ApprovedIndication as ApprovedIndicationProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = ApprovedIndicationProps & BaseProps

export default function ApprovedIndication({
	_type = "ApprovedIndication",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
