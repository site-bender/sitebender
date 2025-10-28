import type BaseProps from "../../../../../types/index.ts"
import type { MemberProgramTier as MemberProgramTierProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = MemberProgramTierProps & BaseProps

export default function MemberProgramTier({
	_type = "MemberProgramTier",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
