import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import * as fc from "fast-check"
import castToPlainDate from "../../../castValue/castToPlainDate/index.ts"
import castToPlainDateTime from "../../../castValue/castToPlainDateTime/index.ts"
import castToPlainTime from "../../../castValue/castToPlainTime/index.ts"
import castToZonedDateTime from "../../../castValue/castToZonedDateTime/index.ts"

describe("Temporal Type Conversion Behaviors", () => {
	describe("when converting to PlainDate", () => {
		it("parses ISO 8601 date strings", () => {
			const result = castToPlainDate("2024-03-15")
			expect(result.right).toBeDefined()
			if (result.right) {
				const date = result.right as Temporal.PlainDate
				expect(date.year).toBe(2024)
				expect(date.month).toBe(3)
				expect(date.day).toBe(15)
			}
		})

		it("handles date object literals", () => {
			const result = castToPlainDate({ year: 2024, month: 3, day: 15 })
			expect(result.right).toBeDefined()
			if (result.right) {
				const date = result.right as Temporal.PlainDate
				expect(date.year).toBe(2024)
				expect(date.month).toBe(3)
				expect(date.day).toBe(15)
			}
		})

		it("converts PlainDateTime to PlainDate", () => {
			const dateTime = Temporal.PlainDateTime.from("2024-03-15T10:30:00")
			const result = castToPlainDate(dateTime)
			expect(result.right).toBeDefined()
			if (result.right) {
				const date = result.right as Temporal.PlainDate
				expect(date.year).toBe(2024)
				expect(date.month).toBe(3)
				expect(date.day).toBe(15)
			}
		})

		it("returns error for invalid date strings", () => {
			const result = castToPlainDate("not-a-date")
			expect(result.left).toBeDefined()
			expect(result.left?.[0].message).toContain("Cannot cast")
		})

		it("returns error for invalid date values", () => {
			expect(castToPlainDate("2024-13-01")).toHaveProperty("left") // Invalid month
			expect(castToPlainDate("2024-02-30")).toHaveProperty("left") // Invalid day
			expect(castToPlainDate("2024-00-15")).toHaveProperty("left") // Invalid month
		})

		it("returns error for null and undefined", () => {
			expect(castToPlainDate(null)).toHaveProperty("left")
			expect(castToPlainDate(undefined)).toHaveProperty("left")
		})

		it("handles edge dates", () => {
			const minResult = castToPlainDate("-271821-04-20")
			expect(minResult.right).toBeDefined()
			
			const maxResult = castToPlainDate("+275760-09-13")
			expect(maxResult.right).toBeDefined()
		})
	})

	describe("when converting to PlainDateTime", () => {
		it("parses ISO 8601 datetime strings", () => {
			const result = castToPlainDateTime("2024-03-15T10:30:45")
			expect(result.right).toBeDefined()
			if (result.right) {
				const dt = result.right as Temporal.PlainDateTime
				expect(dt.year).toBe(2024)
				expect(dt.month).toBe(3)
				expect(dt.day).toBe(15)
				expect(dt.hour).toBe(10)
				expect(dt.minute).toBe(30)
				expect(dt.second).toBe(45)
			}
		})

		it("handles datetime with milliseconds", () => {
			const result = castToPlainDateTime("2024-03-15T10:30:45.123")
			expect(result.right).toBeDefined()
			if (result.right) {
				const dt = result.right as Temporal.PlainDateTime
				expect(dt.millisecond).toBe(123)
			}
		})

		it("handles datetime object literals", () => {
			const result = castToPlainDateTime({
				year: 2024,
				month: 3,
				day: 15,
				hour: 10,
				minute: 30,
				second: 45,
			})
			expect(result.right).toBeDefined()
			if (result.right) {
				const dt = result.right as Temporal.PlainDateTime
				expect(dt.year).toBe(2024)
				expect(dt.hour).toBe(10)
			}
		})

		it("converts PlainDate to PlainDateTime at midnight", () => {
			const date = Temporal.PlainDate.from("2024-03-15")
			const result = castToPlainDateTime(date)
			expect(result.right).toBeDefined()
			if (result.right) {
				const dt = result.right as Temporal.PlainDateTime
				expect(dt.year).toBe(2024)
				expect(dt.month).toBe(3)
				expect(dt.day).toBe(15)
				expect(dt.hour).toBe(0)
				expect(dt.minute).toBe(0)
				expect(dt.second).toBe(0)
			}
		})

		it("returns error for invalid datetime strings", () => {
			const result = castToPlainDateTime("not-a-datetime")
			expect(result.left).toBeDefined()
			expect(result.left?.[0].message).toContain("Cannot cast")
		})

		it("returns error for invalid time values", () => {
			expect(castToPlainDateTime("2024-03-15T25:00:00")).toHaveProperty("left") // Invalid hour
			expect(castToPlainDateTime("2024-03-15T10:60:00")).toHaveProperty("left") // Invalid minute
			expect(castToPlainDateTime("2024-03-15T10:30:60")).toHaveProperty("left") // Invalid second
		})

		it("handles partial datetime strings", () => {
			const result = castToPlainDateTime("2024-03-15")
			expect(result.right).toBeDefined()
			if (result.right) {
				const dt = result.right as Temporal.PlainDateTime
				expect(dt.hour).toBe(0)
				expect(dt.minute).toBe(0)
				expect(dt.second).toBe(0)
			}
		})
	})

	describe("when converting to PlainTime", () => {
		it("parses time strings", () => {
			const result = castToPlainTime("10:30:45")
			expect(result.right).toBeDefined()
			if (result.right) {
				const time = result.right as Temporal.PlainTime
				expect(time.hour).toBe(10)
				expect(time.minute).toBe(30)
				expect(time.second).toBe(45)
			}
		})

		it("handles time with milliseconds", () => {
			const result = castToPlainTime("10:30:45.123")
			expect(result.right).toBeDefined()
			if (result.right) {
				const time = result.right as Temporal.PlainTime
				expect(time.millisecond).toBe(123)
			}
		})

		it("handles time with microseconds and nanoseconds", () => {
			const result = castToPlainTime("10:30:45.123456789")
			expect(result.right).toBeDefined()
			if (result.right) {
				const time = result.right as Temporal.PlainTime
				expect(time.millisecond).toBe(123)
				expect(time.microsecond).toBe(456)
				expect(time.nanosecond).toBe(789)
			}
		})

		it("handles time object literals", () => {
			const result = castToPlainTime({
				hour: 10,
				minute: 30,
				second: 45,
			})
			expect(result.right).toBeDefined()
			if (result.right) {
				const time = result.right as Temporal.PlainTime
				expect(time.hour).toBe(10)
				expect(time.minute).toBe(30)
				expect(time.second).toBe(45)
			}
		})

		it("extracts time from PlainDateTime", () => {
			const dateTime = Temporal.PlainDateTime.from("2024-03-15T10:30:45")
			const result = castToPlainTime(dateTime)
			expect(result.right).toBeDefined()
			if (result.right) {
				const time = result.right as Temporal.PlainTime
				expect(time.hour).toBe(10)
				expect(time.minute).toBe(30)
				expect(time.second).toBe(45)
			}
		})

		it("handles midnight", () => {
			const result = castToPlainTime("00:00:00")
			expect(result.right).toBeDefined()
			if (result.right) {
				const time = result.right as Temporal.PlainTime
				expect(time.hour).toBe(0)
				expect(time.minute).toBe(0)
				expect(time.second).toBe(0)
			}
		})

		it("handles end of day", () => {
			const result = castToPlainTime("23:59:59")
			expect(result.right).toBeDefined()
			if (result.right) {
				const time = result.right as Temporal.PlainTime
				expect(time.hour).toBe(23)
				expect(time.minute).toBe(59)
				expect(time.second).toBe(59)
			}
		})

		it("returns error for invalid time strings", () => {
			const result = castToPlainTime("not-a-time")
			expect(result.left).toBeDefined()
		})

		it("returns error for invalid time values", () => {
			expect(castToPlainTime("25:00:00")).toHaveProperty("left") // Invalid hour
			expect(castToPlainTime("10:60:00")).toHaveProperty("left") // Invalid minute
			expect(castToPlainTime("10:30:60")).toHaveProperty("left") // Invalid second
		})
	})

	describe("when converting to ZonedDateTime", () => {
		it("parses ISO 8601 with timezone", () => {
			const result = castToZonedDateTime("2024-03-15T10:30:45[America/New_York]")
			expect(result.right).toBeDefined()
			if (result.right) {
				const zdt = result.right as Temporal.ZonedDateTime
				expect(zdt.year).toBe(2024)
				expect(zdt.month).toBe(3)
				expect(zdt.day).toBe(15)
				expect(zdt.hour).toBe(10)
				expect(zdt.timeZoneId).toBe("America/New_York")
			}
		})

		it("handles UTC timezone", () => {
			const result = castToZonedDateTime("2024-03-15T10:30:45Z")
			expect(result.right).toBeDefined()
			if (result.right) {
				const zdt = result.right as Temporal.ZonedDateTime
				expect(zdt.timeZoneId).toBe("UTC")
			}
		})

		it("handles offset timezone", () => {
			const result = castToZonedDateTime("2024-03-15T10:30:45-05:00")
			expect(result.right).toBeDefined()
			if (result.right) {
				const zdt = result.right as Temporal.ZonedDateTime
				expect(zdt.offsetNanoseconds).toBe(-5 * 60 * 60 * 1_000_000_000)
			}
		})

		it("handles zoned datetime object literals", () => {
			const result = castToZonedDateTime({
				year: 2024,
				month: 3,
				day: 15,
				hour: 10,
				minute: 30,
				second: 45,
				timeZone: "America/New_York",
			})
			expect(result.right).toBeDefined()
			if (result.right) {
				const zdt = result.right as Temporal.ZonedDateTime
				expect(zdt.year).toBe(2024)
				expect(zdt.timeZoneId).toBe("America/New_York")
			}
		})

		it("returns error for datetime without timezone", () => {
			const result = castToZonedDateTime("2024-03-15T10:30:45")
			expect(result.left).toBeDefined()
		})

		it("returns error for invalid timezone", () => {
			const result = castToZonedDateTime("2024-03-15T10:30:45[Invalid/Timezone]")
			expect(result.left).toBeDefined()
		})

		it("returns error for null and undefined", () => {
			expect(castToZonedDateTime(null)).toHaveProperty("left")
			expect(castToZonedDateTime(undefined)).toHaveProperty("left")
		})

		it("handles daylight saving time transitions", () => {
			// Spring forward (2am becomes 3am)
			const springResult = castToZonedDateTime("2024-03-10T02:30:00[America/New_York]")
			expect(springResult.right).toBeDefined()
			
			// Fall back (2am happens twice)
			const fallResult = castToZonedDateTime("2024-11-03T01:30:00[America/New_York]")
			expect(fallResult.right).toBeDefined()
		})
	})

	describe("property-based tests", () => {
		describe("PlainDate properties", () => {
			it("castToPlainDate preserves valid dates", () => {
				fc.assert(fc.property(
					fc.integer({ min: 1000, max: 3000 }),
					fc.integer({ min: 1, max: 12 }),
					fc.integer({ min: 1, max: 28 }), // Safe day range for all months
					(year, month, day) => {
						const dateObj = { year, month, day }
						const result = castToPlainDate(dateObj)
						
						if (result.right) {
							const date = result.right as Temporal.PlainDate
							expect(date.year).toBe(year)
							expect(date.month).toBe(month)
							expect(date.day).toBe(day)
						}
					}
				))
			})

			it("castToPlainDate round-trip with ISO string", () => {
				fc.assert(fc.property(
					fc.integer({ min: 1000, max: 3000 }),
					fc.integer({ min: 1, max: 12 }),
					fc.integer({ min: 1, max: 28 }),
					(year, month, day) => {
						const isoString = `${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
						const result = castToPlainDate(isoString)
						
						if (result.right) {
							const date = result.right as Temporal.PlainDate
							expect(date.toString()).toBe(isoString)
						}
					}
				))
			})

			it("castToPlainDate from PlainDateTime preserves date part", () => {
				fc.assert(fc.property(
					fc.integer({ min: 1000, max: 3000 }),
					fc.integer({ min: 1, max: 12 }),
					fc.integer({ min: 1, max: 28 }),
					fc.integer({ min: 0, max: 23 }),
					fc.integer({ min: 0, max: 59 }),
					(year, month, day, hour, minute) => {
						const dateTime = Temporal.PlainDateTime.from({ year, month, day, hour, minute })
						const result = castToPlainDate(dateTime)
						
						if (result.right) {
							const date = result.right as Temporal.PlainDate
							expect(date.year).toBe(year)
							expect(date.month).toBe(month)
							expect(date.day).toBe(day)
						}
					}
				))
			})
		})

		describe("PlainDateTime properties", () => {
			it("castToPlainDateTime preserves valid datetime components", () => {
				fc.assert(fc.property(
					fc.integer({ min: 1000, max: 3000 }),
					fc.integer({ min: 1, max: 12 }),
					fc.integer({ min: 1, max: 28 }),
					fc.integer({ min: 0, max: 23 }),
					fc.integer({ min: 0, max: 59 }),
					fc.integer({ min: 0, max: 59 }),
					(year, month, day, hour, minute, second) => {
						const dtObj = { year, month, day, hour, minute, second }
						const result = castToPlainDateTime(dtObj)
						
						if (result.right) {
							const dt = result.right as Temporal.PlainDateTime
							expect(dt.year).toBe(year)
							expect(dt.month).toBe(month)
							expect(dt.day).toBe(day)
							expect(dt.hour).toBe(hour)
							expect(dt.minute).toBe(minute)
							expect(dt.second).toBe(second)
						}
					}
				))
			})

			it("castToPlainDateTime from PlainDate sets time to midnight", () => {
				fc.assert(fc.property(
					fc.integer({ min: 1000, max: 3000 }),
					fc.integer({ min: 1, max: 12 }),
					fc.integer({ min: 1, max: 28 }),
					(year, month, day) => {
						const date = Temporal.PlainDate.from({ year, month, day })
						const result = castToPlainDateTime(date)
						
						if (result.right) {
							const dt = result.right as Temporal.PlainDateTime
							expect(dt.hour).toBe(0)
							expect(dt.minute).toBe(0)
							expect(dt.second).toBe(0)
							expect(dt.millisecond).toBe(0)
						}
					}
				))
			})

			it("castToPlainDateTime round-trip preserves precision", () => {
				fc.assert(fc.property(
					fc.integer({ min: 1000, max: 3000 }),
					fc.integer({ min: 1, max: 12 }),
					fc.integer({ min: 1, max: 28 }),
					fc.integer({ min: 0, max: 23 }),
					fc.integer({ min: 0, max: 59 }),
					fc.integer({ min: 0, max: 59 }),
					fc.integer({ min: 0, max: 999 }),
					(year, month, day, hour, minute, second, millisecond) => {
						const original = Temporal.PlainDateTime.from({ 
							year, month, day, hour, minute, second, millisecond 
						})
						const result = castToPlainDateTime(original)
						
						if (result.right) {
							const dt = result.right as Temporal.PlainDateTime
							expect(dt.equals(original)).toBe(true)
						}
					}
				))
			})
		})

		describe("PlainTime properties", () => {
			it("castToPlainTime preserves valid time components", () => {
				fc.assert(fc.property(
					fc.integer({ min: 0, max: 23 }),
					fc.integer({ min: 0, max: 59 }),
					fc.integer({ min: 0, max: 59 }),
					fc.integer({ min: 0, max: 999 }),
					(hour, minute, second, millisecond) => {
						const timeObj = { hour, minute, second, millisecond }
						const result = castToPlainTime(timeObj)
						
						if (result.right) {
							const time = result.right as Temporal.PlainTime
							expect(time.hour).toBe(hour)
							expect(time.minute).toBe(minute)
							expect(time.second).toBe(second)
							expect(time.millisecond).toBe(millisecond)
						}
					}
				))
			})

			it("castToPlainTime from PlainDateTime extracts time part", () => {
				fc.assert(fc.property(
					fc.integer({ min: 1000, max: 3000 }),
					fc.integer({ min: 1, max: 12 }),
					fc.integer({ min: 1, max: 28 }),
					fc.integer({ min: 0, max: 23 }),
					fc.integer({ min: 0, max: 59 }),
					fc.integer({ min: 0, max: 59 }),
					(year, month, day, hour, minute, second) => {
						const dateTime = Temporal.PlainDateTime.from({ 
							year, month, day, hour, minute, second 
						})
						const result = castToPlainTime(dateTime)
						
						if (result.right) {
							const time = result.right as Temporal.PlainTime
							expect(time.hour).toBe(hour)
							expect(time.minute).toBe(minute)
							expect(time.second).toBe(second)
						}
					}
				))
			})

			it("castToPlainTime round-trip with string", () => {
				fc.assert(fc.property(
					fc.integer({ min: 0, max: 23 }),
					fc.integer({ min: 0, max: 59 }),
					fc.integer({ min: 0, max: 59 }),
					(hour, minute, second) => {
						const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
						const result = castToPlainTime(timeString)
						
						if (result.right) {
							const time = result.right as Temporal.PlainTime
							expect(time.toString().substring(0, 8)).toBe(timeString)
						}
					}
				))
			})
		})

		describe("error handling properties", () => {
			it("invalid date inputs consistently return Left", () => {
				fc.assert(fc.property(
					fc.oneof(
						fc.constant(null),
						fc.constant(undefined),
						fc.string().filter(s => !s.match(/^\d{4}-\d{2}-\d{2}/)),
						fc.object()
					),
					(invalidInput) => {
						const dateResult = castToPlainDate(invalidInput)
						const dateTimeResult = castToPlainDateTime(invalidInput)
						const timeResult = castToPlainTime(invalidInput)
						const zonedResult = castToZonedDateTime(invalidInput)
						
						if (invalidInput === null || invalidInput === undefined || 
							(typeof invalidInput === "string" && !invalidInput.match(/^\d{4}-\d{2}-\d{2}/))) {
							expect(dateResult.left).toBeDefined()
							expect(dateTimeResult.left).toBeDefined()
							expect(timeResult.left).toBeDefined()
							expect(zonedResult.left).toBeDefined()
						}
					}
				))
			})

			it("out-of-range values are handled consistently", () => {
				fc.assert(fc.property(
					fc.integer({ min: -1000, max: 0 }), // Invalid year
					fc.integer({ min: 13, max: 20 }), // Invalid month
					fc.integer({ min: 32, max: 40 }), // Invalid day
					(year, month, day) => {
						const invalidDate = { year, month, day }
						const result = castToPlainDate(invalidDate)
						expect(result.left).toBeDefined()
					}
				))
			})

			it("invalid time values are handled consistently", () => {
				fc.assert(fc.property(
					fc.integer({ min: 24, max: 30 }), // Invalid hour
					fc.integer({ min: 60, max: 70 }), // Invalid minute
					fc.integer({ min: 60, max: 70 }), // Invalid second
					(hour, minute, second) => {
						const invalidTime = { hour, minute, second }
						const result = castToPlainTime(invalidTime)
						expect(result.left).toBeDefined()
					}
				))
			})
		})

		describe("consistency properties", () => {
			it("successful conversions return consistent types", () => {
				fc.assert(fc.property(
					fc.integer({ min: 1000, max: 3000 }),
					fc.integer({ min: 1, max: 12 }),
					fc.integer({ min: 1, max: 28 }),
					(year, month, day) => {
						const dateObj = { year, month, day }
						const dateResult = castToPlainDate(dateObj)
						
						if (dateResult.right) {
							const date = dateResult.right as Temporal.PlainDate
							expect(date).toBeInstanceOf(Temporal.PlainDate)
							expect(typeof date.year).toBe("number")
							expect(typeof date.month).toBe("number")
							expect(typeof date.day).toBe("number")
						}
					}
				))
			})

			it("temporal objects have consistent string representations", () => {
				fc.assert(fc.property(
					fc.integer({ min: 1000, max: 3000 }),
					fc.integer({ min: 1, max: 12 }),
					fc.integer({ min: 1, max: 28 }),
					fc.integer({ min: 0, max: 23 }),
					fc.integer({ min: 0, max: 59 }),
					(year, month, day, hour, minute) => {
						const dtObj = { year, month, day, hour, minute }
						const result = castToPlainDateTime(dtObj)
						
						if (result.right) {
							const dt = result.right as Temporal.PlainDateTime
							const str = dt.toString()
							expect(typeof str).toBe("string")
							expect(str).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/)
						}
					}
				))
			})
		})

		describe("mathematical properties", () => {
			it("date operations preserve mathematical relationships", () => {
				fc.assert(fc.property(
					fc.integer({ min: 1000, max: 3000 }),
					fc.integer({ min: 1, max: 12 }),
					fc.integer({ min: 1, max: 28 }),
					fc.integer({ min: 1, max: 10 }),
					(year, month, day, addDays) => {
						const dateObj = { year, month, day }
						const result = castToPlainDate(dateObj)
						
						if (result.right) {
							const date = result.right as Temporal.PlainDate
							const laterDate = date.add({ days: addDays })
							
							// The later date should be after the original
							expect(Temporal.PlainDate.compare(laterDate, date)).toBe(1)
						}
					}
				))
			})

			it("time arithmetic maintains ordering", () => {
				fc.assert(fc.property(
					fc.integer({ min: 0, max: 22 }), // Leave room for addition
					fc.integer({ min: 0, max: 59 }),
					fc.integer({ min: 0, max: 59 }),
					fc.integer({ min: 1, max: 2 }),
					(hour, minute, second, addHours) => {
						const timeObj = { hour, minute, second }
						const result = castToPlainTime(timeObj)
						
						if (result.right) {
							const time = result.right as Temporal.PlainTime
							const laterTime = time.add({ hours: addHours })
							
							// The later time should be after the original
							expect(Temporal.PlainTime.compare(laterTime, time)).toBe(1)
						}
					}
				))
			})
		})

		describe("conversion chain properties", () => {
			it("PlainDate -> PlainDateTime -> PlainDate preserves date", () => {
				fc.assert(fc.property(
					fc.integer({ min: 1000, max: 3000 }),
					fc.integer({ min: 1, max: 12 }),
					fc.integer({ min: 1, max: 28 }),
					(year, month, day) => {
						const originalDate = Temporal.PlainDate.from({ year, month, day })
						const asDateTime = castToPlainDateTime(originalDate)
						
						if (asDateTime.right) {
							const backToDate = castToPlainDate(asDateTime.right)
							
							if (backToDate.right) {
								const finalDate = backToDate.right as Temporal.PlainDate
								expect(finalDate.equals(originalDate)).toBe(true)
							}
						}
					}
				))
			})

			it("PlainDateTime -> PlainTime -> preserves time components", () => {
				fc.assert(fc.property(
					fc.integer({ min: 1000, max: 3000 }),
					fc.integer({ min: 1, max: 12 }),
					fc.integer({ min: 1, max: 28 }),
					fc.integer({ min: 0, max: 23 }),
					fc.integer({ min: 0, max: 59 }),
					fc.integer({ min: 0, max: 59 }),
					(year, month, day, hour, minute, second) => {
						const originalDateTime = Temporal.PlainDateTime.from({ 
							year, month, day, hour, minute, second 
						})
						const asTime = castToPlainTime(originalDateTime)
						
						if (asTime.right) {
							const time = asTime.right as Temporal.PlainTime
							expect(time.hour).toBe(hour)
							expect(time.minute).toBe(minute)
							expect(time.second).toBe(second)
						}
					}
				))
			})
		})
	})
})