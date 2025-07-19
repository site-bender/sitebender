import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type StructuredValue from "../index.ts"
import type { StructuredValueProps } from "../index.ts"

export interface MonetaryAmountProps {
	/** The currency in which the monetary amount is expressed.\n\nUse standard formats: [ISO 4217 currency format](http://en.wikipedia.org/wiki/ISO_4217), e.g. "USD"; [Ticker symbol](https://en.wikipedia.org/wiki/List_of_cryptocurrencies) for cryptocurrencies, e.g. "BTC"; well known names for [Local Exchange Trading Systems](https://en.wikipedia.org/wiki/Local_exchange_trading_system) (LETS) and other currency types, e.g. "Ithaca HOUR". */
	currency?: Text
	/** The upper value of some characteristic or property. */
	maxValue?: Number
	/** The lower value of some characteristic or property. */
	minValue?: Number
	/** The date when the item becomes valid. */
	validFrom?: Date | DateTime
	/** The date after when the item is not valid. For example the end of an offer, salary period, or a period of opening hours. */
	validThrough?: Date | DateTime
	/** The value of a [[QuantitativeValue]] (including [[Observation]]) or property value node.\n\n* For [[QuantitativeValue]] and [[MonetaryAmount]], the recommended type for values is 'Number'.\n* For [[PropertyValue]], it can be 'Text', 'Number', 'Boolean', or 'StructuredValue'.\n* Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE' (U+0039)) rather than superficially similar Unicode symbols.\n* Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal point. Avoid using these symbols as a readability separator. */
	value?: Text | Number | Boolean | StructuredValue
}

type MonetaryAmount =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& MonetaryAmountProps

export default MonetaryAmount
