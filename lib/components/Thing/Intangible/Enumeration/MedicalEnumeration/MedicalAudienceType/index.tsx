import type BaseProps from "../../../../../../types/index.ts"
import type { MedicalAudienceType as MedicalAudienceTypeProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = MedicalAudienceTypeProps & BaseProps

export default function MedicalAudienceType({
	_type = "MedicalAudienceType",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
