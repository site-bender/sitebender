import type BaseProps from "../../../../../types/index.ts"
import type { ArchiveOrganization as ArchiveOrganizationProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = ArchiveOrganizationProps & BaseProps

export default function ArchiveOrganization({
	_type = "ArchiveOrganization",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
