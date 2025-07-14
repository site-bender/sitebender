import { Date, DateTime, Text } from "../../../DataType/index.ts"
import Organization from "../../Organization/index.ts"
import Person from "../../Person/index.ts"
import AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import Place from "../../Place/index.ts"
import Product from "../../Product/index.ts"
import DefinedTerm from "../DefinedTerm/index.ts"
import IncentiveQualifiedExpenseType from "../Enumeration/IncentiveQualifiedExpenseType/index.ts"
import IncentiveStatus from "../Enumeration/IncentiveStatus/index.ts"
import IncentiveType from "../Enumeration/IncentiveType/index.ts"
import PurchaseType from "../Enumeration/PurchaseType/index.ts"
import Intangible from "../index.ts"
import LoanOrCredit from "../Service/FinancialProduct/LoanOrCredit/index.ts"
import GeoShape from "../StructuredValue/GeoShape/index.ts"
import MonetaryAmount from "../StructuredValue/MonetaryAmount/index.ts"
import UnitPriceSpecification from "../StructuredValue/PriceSpecification/UnitPriceSpecification/index.ts"
import QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"

export default interface FinancialIncentive extends Intangible {
	/** The geographic area where a service or offered item is provided. */
	areaServed?: AdministrativeArea | Place | GeoShape | Text
	/** The supplier of the incentivized item/service for which the incentive is valid for such as a utility company, merchant, or contractor. */
	eligibleWithSupplier?: Organization
	/** Describes the amount that can be redeemed from this incentive.      <p>[[QuantitativeValue]]: Use this for incentives based on price (either raw amount or percentage-based). For a raw amount example, "You can claim $2,500 - $7,500 from the total cost of installation" would be represented as the following:</p>     {         "@type": "QuantitativeValue",         “minValue”: 2500,         “maxValue”: 7500,         "unitCode": "USD"     } <p>[[QuantitivateValue]] can also be used for percentage amounts. In such cases, value is used to represent the incentive’s percentage, while maxValue represents a limit (if one exists) to that incentive. The unitCode should be 'P1' and the unitText should be '%', while valueReference should be used for holding the currency type. For example, "You can claim up to 30% of the total cost of installation, up to a maximum of $7,500" would be:</p>     {         "@type": "QuantitativeValue",         "value": 30,         "unitCode": "P1",         "unitText": "%",         “maxValue”: 7500,         “valueReference”: “USD”     } <p>[[UnitPriceSpecification]]: Use this for incentives that are based on amounts rather than price. For example, a net metering rebate that pays $10/kWh, up to $1,000:</p>     {         "@type": "UnitPriceSpecification",         "price": 10,         "priceCurrency": "USD",         "referenceQuantity": 1,         "unitCode": "DO3",         "unitText": "kw/h",         "maxPrice": 1000,         "description": "$10 / kwh up to $1000"     } <p>[[LoanOrCredit]]: Use for incentives that are loan based. For example, a loan of $4,000 - $50,000 with a repayment term of 10 years, interest free would look like:</p>     {         "@type": "LoanOrCredit",         "loanTerm": {                 "@type":"QuantitativeValue",                 "value":"10",                 "unitCode": "ANN"             },         "amount":[             {                 "@type": "QuantitativeValue",                 "Name":"fixed interest rate",                 "value":"0",             },         ],         "amount":[             {                 "@type": "MonetaryAmount",                 "Name":"min loan amount",                 "value":"4000",                 "currency":"CAD"             },             {                 "@type": "MonetaryAmount",                 "Name":"max loan amount",                 "value":"50000",                 "currency":"CAD"             }         ],     }  In summary: <ul><li>Use [[QuantitativeValue]] for absolute/percentage-based incentives applied on the price of a good/service.</li> <li>Use [[UnitPriceSpecification]] for incentives based on a per-unit basis (e.g. net metering).</li> <li>Use [[LoanOrCredit]] for loans/credits.</li> </ul>. */
	incentiveAmount?: QuantitativeValue | UnitPriceSpecification | LoanOrCredit
	/** The status of the incentive (active, on hold, retired, etc.). */
	incentiveStatus?: IncentiveStatus
	/** The type of incentive offered (tax credit/rebate, tax deduction, tax waiver, subsidies, etc.). */
	incentiveType?: IncentiveType
	/** The type or specific product(s) and/or service(s) being incentivized. <p>DefinedTermSets are used for product and service categories such as the United Nations Standard Products and Services Code:</p>     {         "@type": "DefinedTerm",         "inDefinedTermSet": "https://www.unspsc.org/",         "termCode": "261315XX",         "name": "Photovoltaic module"     }  <p>For a specific product or service, use the Product type:</p>     {         "@type": "Product",         "name": "Kenmore White 17" Microwave",     } For multiple different incentivized items, use multiple [[DefinedTerm]] or [[Product]]. */
	incentivizedItem?: Product | DefinedTerm
	/** Optional. Income limit for which the incentive is applicable for.      <p>If MonetaryAmount is specified, this should be based on annualized income (e.g. if an incentive is limited to those making <$114,000 annually):</p>     {         "@type": "MonetaryAmount",         "maxValue": 114000,         "currency": "USD",     }  Use Text for incentives that are limited based on other criteria, for example if an incentive is only available to recipients making 120% of the median poverty income in their area. */
	incomeLimit?: MonetaryAmount | Text
	/** The service provider, service operator, or service performer; the goods producer. Another party (a seller) may offer those services or goods on behalf of the provider. A provider may also serve as the seller. */
	provider?: Organization | Person
	/** The publisher of the article in question. */
	publisher?: Organization | Person
	/** Optional. The maximum price the item can have and still qualify for this offer. */
	purchasePriceLimit?: MonetaryAmount
	/** Optional. The type of purchase the consumer must make in order to qualify for this incentive. */
	purchaseType?: PurchaseType
	/** Optional. The types of expenses that are covered by the incentive. For example some incentives are only for the goods (tangible items) but the services (labor) are excluded. */
	qualifiedExpense?: IncentiveQualifiedExpenseType
	/** The date when the item becomes valid. */
	validFrom?: Date | DateTime
	/** The date after when the item is not valid. For example the end of an offer, salary period, or a period of opening hours. */
	validThrough?: Date | DateTime
}
