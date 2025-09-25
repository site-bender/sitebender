import type BaseProps from "../../../../../types/index.ts"
import type { AdministrativeArea as AdministrativeAreaProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = AdministrativeAreaProps & BaseProps

export default function AdministrativeArea({
	_type = "AdministrativeArea",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
