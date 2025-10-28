import type BaseProps from "../../../../../../types/index.ts"
import type { GovernmentOffice as GovernmentOfficeProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = GovernmentOfficeProps & BaseProps

export default function GovernmentOffice({
	_type = "GovernmentOffice",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
