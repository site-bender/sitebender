import type BaseProps from "../../../../../types/index.ts"
import type { MedicalWebPage as MedicalWebPageProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = MedicalWebPageProps & BaseProps

export default function MedicalWebPage({
	_type = "MedicalWebPage",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
