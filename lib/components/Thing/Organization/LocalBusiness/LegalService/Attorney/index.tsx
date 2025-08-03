import type BaseProps from "../../../../../../types/index.ts"
import type { Attorney as AttorneyProps } from "../../../../../../types/index.ts"

import LegalService from "../index.tsx"

export type Props = AttorneyProps & BaseProps

export default function Attorney({
	_type = "Attorney",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
