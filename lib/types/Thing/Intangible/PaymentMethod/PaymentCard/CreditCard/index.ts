import type PaymentCard from "../index.ts"

// CreditCard extends PaymentCard but adds no additional properties

export default interface CreditCard extends PaymentCard {
}
