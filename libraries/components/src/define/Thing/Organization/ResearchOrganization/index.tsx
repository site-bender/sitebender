import type BaseProps from "../../../../../types/index.ts"
import type { ResearchOrganization as ResearchOrganizationProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = ResearchOrganizationProps & BaseProps

export default function ResearchOrganization({
	_type = "ResearchOrganization",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
