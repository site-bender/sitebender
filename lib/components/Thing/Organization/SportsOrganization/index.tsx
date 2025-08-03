import type BaseProps from "../../../../types/index.ts"
import type { SportsOrganization as SportsOrganizationProps } from "../../../../types/index.ts"

import Organization from "../index.tsx"

export type Props = SportsOrganizationProps & BaseProps

export default function SportsOrganization({
	_type = "SportsOrganization",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
