import type BaseProps from "../../../../types/index.ts"
import type { PoliticalParty as PoliticalPartyProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = PoliticalPartyProps & BaseProps

export default function PoliticalParty({
	_type = "PoliticalParty",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
