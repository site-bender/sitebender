//++ Brand utility for creating nominal types - prevents mixing semantically different values of the same primitive type
export type Brand<K, T> = K & { readonly __brand: T }

//++ Safe integer within JavaScript's Number.MIN_SAFE_INTEGER to Number.MAX_SAFE_INTEGER range
export type Integer = Brand<number, "Integer">

//++ Arbitrary precision integer using bigint primitive
export type BigInteger = Brand<bigint, "BigInteger">

//++ Finite floating point number with variable decimal places - WARNING: subject to floating point imprecision
export type RealNumber = Brand<number, "RealNumber">

//++ Exact decimal number with exactly 2 decimal places - commonly used for monetary amounts
export type TwoDecimalPlaces = Brand<number, "TwoDecimalPlaces">

//++ Exact decimal number with exactly 1 decimal place
export type OneDecimalPlace = Brand<number, "OneDecimalPlace">

//++ Exact decimal number with exactly 3 decimal places
export type ThreeDecimalPlaces = Brand<number, "ThreeDecimalPlaces">

//++ Exact decimal number with exactly 4 decimal places
export type FourDecimalPlaces = Brand<number, "FourDecimalPlaces">

//++ Exact decimal number with exactly 8 decimal places
export type EightDecimalPlaces = Brand<number, "EightDecimalPlaces">

//++ Percentage value between 0 and 1 (0% to 100%) with at most 4 decimal places
export type Percent = Brand<number, "Percent">

//++ Email address conforming to RFC 5321 (SMTP) + RFC 6531 (internationalization)
export type EmailAddress = Brand<string, "EmailAddress">

//++ Uniform Resource Locator with protocol and valid domain (no IP addresses)
export type Url = Brand<string, "Url">

//++ Uniform Resource Identifier following RFC 3986 (more permissive than Url)
export type Uri = Brand<string, "Uri">

//++ Internationalized Resource Identifier following RFC 3987 (Unicode version of URI)
export type Iri = Brand<string, "Iri">

//++ IPv4 address in dotted decimal notation (4 octets 0-255)
export type Ipv4Address = Brand<string, "Ipv4Address">

//++ IPv6 address following RFC 4291 with canonical normalization per RFC 5952
export type Ipv6Address = Brand<string, "Ipv6Address">

//++ Domain name following RFC 1034/1035 with IDN support per RFC 5890
export type Domain = Brand<string, "Domain">

//++ Hostname - valid domain name, localhost, or IP address (IPv4 or IPv6)
export type Hostname = Brand<string, "Hostname">

//++ Universally Unique Identifier following RFC 4122 (8-4-4-4-12 format)
export type Uuid = Brand<string, "Uuid">

//++ International Standard Book Number (10-digit format) with valid checksum
export type Isbn10 = Brand<string, "Isbn10">

//++ International Standard Book Number (13-digit format) with valid checksum
export type Isbn13 = Brand<string, "Isbn13">

//++ United States Postal Service ZIP code (5-digit or 9-digit with hyphen)
export type PostalCode = Brand<string, "PostalCode">

//++ United States phone number (10 digits with various formatting)
export type PhoneNumber = Brand<string, "PhoneNumber">
