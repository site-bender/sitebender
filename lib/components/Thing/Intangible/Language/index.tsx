import type BaseProps from "../../../../types/index.ts"
import type { LanguageProps } from "../../../../types/Thing/Intangible/Language/index.ts"

import Intangible from "../index.tsx"

export type Props = LanguageProps & BaseProps

export default function Language({
	_type = "Language",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
