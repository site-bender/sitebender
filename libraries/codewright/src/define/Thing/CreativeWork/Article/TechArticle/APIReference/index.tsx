import type BaseProps from "../../../../../../../types/index.ts"
import type { APIReference as APIReferenceProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = APIReferenceProps & BaseProps

export default function APIReference({
	_type = "APIReference",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
