import type BaseProps from "../../../../types/index.ts"
import type { NewsMediaOrganization as NewsMediaOrganizationProps } from "../../../../types/index.ts"

import Organization from "../index.tsx"

export type Props = NewsMediaOrganizationProps & BaseProps

export default function NewsMediaOrganization({
	_type = "NewsMediaOrganization",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
