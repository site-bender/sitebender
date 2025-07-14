import { Number, Text } from "../../../../DataType/index.ts"
import StructuredValue from "../index.ts"
import MonetaryAmount from "../MonetaryAmount/index.ts"
import UnitPriceSpecification from "../PriceSpecification/UnitPriceSpecification/index.ts"

export default interface ExchangeRateSpecification extends StructuredValue {
	/** The currency in which the monetary amount is expressed.\n\nUse standard formats: [ISO 4217 currency format](http://en.wikipedia.org/wiki/ISO_4217), e.g. "USD"; [Ticker symbol](https://en.wikipedia.org/wiki/List_of_cryptocurrencies) for cryptocurrencies, e.g. "BTC"; well known names for [Local Exchange Trading Systems](https://en.wikipedia.org/wiki/Local_exchange_trading_system) (LETS) and other currency types, e.g. "Ithaca HOUR". */
	currency?: Text
	/** The current price of a currency. */
	currentExchangeRate?: UnitPriceSpecification
	/** The difference between the price at which a broker or other intermediary buys and sells foreign currency. */
	exchangeRateSpread?: MonetaryAmount | Number
}
