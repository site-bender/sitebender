import type BaseProps from "../../../../types/index.ts"
import type { Audience as AudienceProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = AudienceProps & BaseProps

export default function Audience({
	_type = "Audience",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
