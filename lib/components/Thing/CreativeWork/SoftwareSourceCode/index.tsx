import type BaseProps from "../../../../types/index.ts"
import type { SoftwareSourceCode as SoftwareSourceCodeProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = SoftwareSourceCodeProps & BaseProps

export default function SoftwareSourceCode({
	_type = "SoftwareSourceCode",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
