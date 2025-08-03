import type BaseProps from "../../../../../types/index.ts"
import type { ProfessionalService as ProfessionalServiceProps } from "../../../../../types/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = ProfessionalServiceProps & BaseProps

export default function ProfessionalService({
	_type = "ProfessionalService",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
