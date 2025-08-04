import type BaseProps from "../../../../../types/index.ts"
import type { GovernmentService as GovernmentServiceProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = GovernmentServiceProps & BaseProps

export default function GovernmentService({
	_type = "GovernmentService",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
