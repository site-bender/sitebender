import type BaseProps from "../../../../../types/index.ts"
import type { DDxElement as DDxElementProps } from "../../../../../types/index.ts"

import MedicalIntangible from "../index.tsx"

export type Props = DDxElementProps & BaseProps

export default function DDxElement({
	_type = "DDxElement",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
