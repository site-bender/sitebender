import type BaseProps from "../../../../../types/index.ts"
import type { Certification as CertificationProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = CertificationProps & BaseProps

export default function Certification({
	_type = "Certification",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
