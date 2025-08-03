import type BaseProps from "../../../../types/index.ts"
import type { LocalBusiness as LocalBusinessProps } from "../../../../types/index.ts"

import Organization from "../index.tsx"

export type Props = LocalBusinessProps & BaseProps

export default function LocalBusiness({
	_type = "LocalBusiness",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
