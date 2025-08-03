import type BaseProps from "../../../../types/index.ts"
import type { MedicalOrganization as MedicalOrganizationProps } from "../../../../types/index.ts"

import Organization from "../index.tsx"

export type Props = MedicalOrganizationProps & BaseProps

export default function MedicalOrganization({
	_type = "MedicalOrganization",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
