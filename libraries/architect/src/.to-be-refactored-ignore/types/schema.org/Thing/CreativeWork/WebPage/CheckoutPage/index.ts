import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageProps } from "../index.ts"

export type CheckoutPageType = "CheckoutPage"

export interface CheckoutPageProps {
	"@type"?: CheckoutPageType
}

type CheckoutPage = Thing & CreativeWorkProps & WebPageProps & CheckoutPageProps

export default CheckoutPage
