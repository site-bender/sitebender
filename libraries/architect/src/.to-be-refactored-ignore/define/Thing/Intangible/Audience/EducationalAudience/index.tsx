import type BaseProps from "../../../../../../types/index.ts"
import type { EducationalAudience as EducationalAudienceProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = EducationalAudienceProps & BaseProps

export default function EducationalAudience({
	_type = "EducationalAudience",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
