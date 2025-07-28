import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../../types/index.ts"
import type NewspaperProps from "../../../../../../../types/Thing/Newspaper/index.ts"
import type PeriodicalProps from "../../../../../../../types/Thing/Periodical/index.ts"

import Periodical from "../index.tsx"

// Newspaper adds no properties to the Periodical schema type
export type Props = BaseComponentProps<
	NewspaperProps,
	"Newspaper",
	ExtractLevelProps<NewspaperProps, PeriodicalProps>
>

export default function Newspaper({
	_type = "Newspaper",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Periodical
			{...props}
			_type={_type}
			subtypeProperties={subtypeProperties}
		/>
	)
}
