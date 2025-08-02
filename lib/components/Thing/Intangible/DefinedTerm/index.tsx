import type BaseProps from "../../../../types/index.ts"
import type DefinedTermProps from "../../../../types/Thing/Intangible/DefinedTerm/index.ts"

import Intangible from "../index.tsx"

export type Props = DefinedTermProps & BaseProps

export default function DefinedTerm({
	inDefinedTermSet,
	termCode,
	_type = "DefinedTerm",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				inDefinedTermSet,
				termCode,
				...subtypeProperties,
			}}
		>
			{children}
		</Intangible>
	)
}
