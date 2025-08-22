import type BaseProps from "../../../../../types/index.ts"
import type { PeopleAudience as PeopleAudienceProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = PeopleAudienceProps & BaseProps

export default function PeopleAudience({
	_type = "PeopleAudience",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
