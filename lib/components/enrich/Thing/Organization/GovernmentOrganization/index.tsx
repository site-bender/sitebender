import type BaseProps from "../../../../types/index.ts"
import type { GovernmentOrganization as GovernmentOrganizationProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = GovernmentOrganizationProps & BaseProps

export default function GovernmentOrganization({
	_type = "GovernmentOrganization",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
