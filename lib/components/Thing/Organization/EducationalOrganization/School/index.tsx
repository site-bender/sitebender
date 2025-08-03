import type BaseProps from "../../../../../types/index.ts"
import type { School as SchoolProps } from "../../../../../types/index.ts"

import EducationalOrganization from "../index.tsx"

export type Props = SchoolProps & BaseProps

export default function School({
	_type = "School",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
