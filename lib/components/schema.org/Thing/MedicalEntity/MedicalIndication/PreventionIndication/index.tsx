import type BaseProps from "../../../../../types/index.ts"
import type { PreventionIndication as PreventionIndicationProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = PreventionIndicationProps & BaseProps

export default function PreventionIndication({
	_type = "PreventionIndication",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
