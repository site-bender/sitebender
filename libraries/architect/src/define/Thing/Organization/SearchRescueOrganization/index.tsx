import type BaseProps from "../../../../../types/index.ts"
import type { SearchRescueOrganization as SearchRescueOrganizationProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = SearchRescueOrganizationProps & BaseProps

export default function SearchRescueOrganization({
	_type = "SearchRescueOrganization",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
