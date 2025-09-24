// Basic Schema.org DataType aliases
export type False = false
export type True = true
export type Boolean = False | True
export type Date = string
export type DateTime = string
export type Float = number
export type Integer = bigint
export type Number = Float | Integer
export type CssSelectorType = string
export type PronounceableText = string
export type XPathType = string
export type URL = string
export type Text = CssSelectorType | PronounceableText | URL | XPathType
export type Time = string
