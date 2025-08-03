import type BaseProps from "../../../../../../types/index.ts"
import type { ParentAudience as ParentAudienceProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = ParentAudienceProps & BaseProps

export default function ParentAudience({
	_type = "ParentAudience",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
