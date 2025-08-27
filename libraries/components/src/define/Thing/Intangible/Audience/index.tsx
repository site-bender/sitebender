import type BaseProps from "../../../../../types/schema.org/index.ts"
import type AudienceProps from "../../../../../types/schema.org/Thing/Intangible/Audience/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = AudienceProps & BaseProps

export default function Audience({
	_type = "Audience",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
