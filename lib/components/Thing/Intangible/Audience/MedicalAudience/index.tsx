import type BaseProps from "../../../../../types/index.ts"
import type { MedicalAudience as MedicalAudienceProps } from "../../../../../types/index.ts"

import Audience from "../index.tsx"

export type Props = MedicalAudienceProps & BaseProps

export default function MedicalAudience({
	_type = "MedicalAudience",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
