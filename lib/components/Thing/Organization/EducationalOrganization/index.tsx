import type BaseProps from "../../../../types/index.ts"
import type { EducationalOrganization as EducationalOrganizationProps } from "../../../../types/index.ts"

import Organization from "../index.tsx"

export type Props = EducationalOrganizationProps & BaseProps

export default function EducationalOrganization({
	_type = "EducationalOrganization",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
