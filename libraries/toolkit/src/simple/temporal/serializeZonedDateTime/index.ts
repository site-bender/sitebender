/**
 * Serializes ZonedDateTime for storage/transmission
 *
 * Converts a Temporal.ZonedDateTime into a serializable JSON object that
 * preserves all timezone and instant information. The serialized format
 * can be safely stored in databases, transmitted over networks, or cached,
 * and later reconstructed back to a ZonedDateTime. Returns null for invalid
 * inputs to support safe error handling.
 *
 * @param zonedDateTime - The ZonedDateTime to serialize
 * @returns Serialized object with instant and timezone info, or null if invalid
 * @example
 * ```typescript
 * // Basic serialization
 * const zdt = Temporal.ZonedDateTime.from("2024-03-15T14:30:00[America/New_York]")
 * serializeZonedDateTime(zdt)
 * // {
 * //   instant: "2024-03-15T18:30:00Z",
 * //   timeZone: "America/New_York",
 * //   calendar: "iso8601",
 * //   offset: "-04:00",
 * //   plainDateTime: "2024-03-15T14:30:00",
 * //   epochNanoseconds: "1710519000000000000"
 * // }
 *
 * // Serialize different timezone
 * const london = Temporal.ZonedDateTime.from("2024-03-15T14:30:00[Europe/London]")
 * serializeZonedDateTime(london)
 * // {
 * //   instant: "2024-03-15T14:30:00Z",
 * //   timeZone: "Europe/London",
 * //   calendar: "iso8601",
 * //   offset: "+00:00",
 * //   plainDateTime: "2024-03-15T14:30:00",
 * //   epochNanoseconds: "1710511800000000000"
 * // }
 *
 * // Serialize with subsecond precision
 * const precise = Temporal.ZonedDateTime.from("2024-03-15T14:30:00.123456789[UTC]")
 * serializeZonedDateTime(precise)
 * // {
 * //   instant: "2024-03-15T14:30:00.123456789Z",
 * //   timeZone: "UTC",
 * //   calendar: "iso8601",
 * //   offset: "+00:00",
 * //   plainDateTime: "2024-03-15T14:30:00.123456789",
 * //   epochNanoseconds: "1710511800123456789"
 * // }
 *
 * // Serialize during DST transition
 * const dstTime = Temporal.ZonedDateTime.from("2024-03-10T14:30:00[America/New_York]")
 * serializeZonedDateTime(dstTime)
 * // {
 * //   instant: "2024-03-10T19:30:00Z",
 * //   timeZone: "America/New_York",
 * //   calendar: "iso8601",
 * //   offset: "-05:00", // Still EST before DST switch
 * //   plainDateTime: "2024-03-10T14:30:00",
 * //   epochNanoseconds: "1710094200000000000"
 * // }
 *
 * // Serialize with custom calendar
 * const customCal = zdt.withCalendar("hebrew")
 * serializeZonedDateTime(customCal)
 * // {
 * //   instant: "2024-03-15T18:30:00Z",
 * //   timeZone: "America/New_York",
 * //   calendar: "hebrew",
 * //   offset: "-04:00",
 * //   plainDateTime: "2024-03-15T14:30:00",
 * //   epochNanoseconds: "1710519000000000000"
 * // }
 *
 * // Database storage example
 * function saveAppointment(
 *   id: string,
 *   time: Temporal.ZonedDateTime,
 *   description: string
 * ): object {
 *   const serializedTime = serializeZonedDateTime(time)
 *   if (!serializedTime) {
 *     throw new Error("Invalid appointment time")
 *   }
 *
 *   return {
 *     id,
 *     time: serializedTime,
 *     description,
 *     createdAt: new Date().toISOString()
 *   }
 * }
 *
 * const appointment = saveAppointment(
 *   "apt-123",
 *   Temporal.ZonedDateTime.from("2024-03-15T14:30:00[America/New_York]"),
 *   "Doctor visit"
 * )
 *
 * // API response serialization
 * function createEventResponse(events: Array<{
 *   name: string
 *   time: Temporal.ZonedDateTime
 * }>): object {
 *   return {
 *     events: events.map(event => ({
 *       name: event.name,
 *       time: serializeZonedDateTime(event.time)
 *     })).filter(event => event.time !== null)
 *   }
 * }
 *
 * const events = [
 *   {
 *     name: "Meeting",
 *     time: Temporal.ZonedDateTime.from("2024-03-15T09:00:00[America/New_York]")
 *   },
 *   {
 *     name: "Lunch",
 *     time: Temporal.ZonedDateTime.from("2024-03-15T12:30:00[America/New_York]")
 *   }
 * ]
 * const response = createEventResponse(events)
 *
 * // Cache serialization
 * function cacheZonedDateTime(
 *   key: string,
 *   zdt: Temporal.ZonedDateTime
 * ): string | null {
 *   const serialized = serializeZonedDateTime(zdt)
 *   return serialized ? JSON.stringify(serialized) : null
 * }
 *
 * const cachedValue = cacheZonedDateTime(
 *   "meeting-time",
 *   Temporal.ZonedDateTime.from("2024-03-15T14:30:00[America/New_York]")
 * )
 *
 * // Message queue serialization
 * function createTimeBasedMessage(
 *   type: string,
 *   scheduledFor: Temporal.ZonedDateTime,
 *   payload: object
 * ): object | null {
 *   const serializedTime = serializeZonedDateTime(scheduledFor)
 *   if (!serializedTime) return null
 *
 *   return {
 *     type,
 *     scheduledFor: serializedTime,
 *     payload,
 *     messageId: crypto.randomUUID()
 *   }
 * }
 *
 * // Log entry serialization
 * function logTimestampedEvent(
 *   event: string,
 *   timestamp: Temporal.ZonedDateTime,
 *   metadata: object = {}
 * ): object | null {
 *   const serializedTime = serializeZonedDateTime(timestamp)
 *   if (!serializedTime) return null
 *
 *   return {
 *     event,
 *     timestamp: serializedTime,
 *     metadata,
 *     logLevel: "info"
 *   }
 * }
 *
 * // Audit trail serialization
 * function createAuditEntry(
 *   action: string,
 *   userId: string,
 *   timestamp: Temporal.ZonedDateTime
 * ): object | null {
 *   const serializedTime = serializeZonedDateTime(timestamp)
 *   if (!serializedTime) return null
 *
 *   return {
 *     action,
 *     userId,
 *     timestamp: serializedTime,
 *     auditId: crypto.randomUUID()
 *   }
 * }
 *
 * // Configuration serialization
 * function serializeScheduleConfig(config: {
 *   startTime: Temporal.ZonedDateTime
 *   endTime: Temporal.ZonedDateTime
 *   repeatPattern: string
 * }): object | null {
 *   const serializedStart = serializeZonedDateTime(config.startTime)
 *   const serializedEnd = serializeZonedDateTime(config.endTime)
 *
 *   if (!serializedStart || !serializedEnd) return null
 *
 *   return {
 *     startTime: serializedStart,
 *     endTime: serializedEnd,
 *     repeatPattern: config.repeatPattern
 *   }
 * }
 *
 * // Backup/restore operations
 * function backupTimestamps(
 *   data: Array<{ id: string; timestamp: Temporal.ZonedDateTime }>
 * ): Array<{ id: string; timestamp: object }> {
 *   return data
 *     .map(item => ({
 *       id: item.id,
 *       timestamp: serializeZonedDateTime(item.timestamp)
 *     }))
 *     .filter(item => item.timestamp !== null) as Array<{
 *       id: string;
 *       timestamp: object
 *     }>
 * }
 *
 * // State persistence
 * function persistTimerState(state: {
 *   isRunning: boolean
 *   startTime?: Temporal.ZonedDateTime
 *   pausedAt?: Temporal.ZonedDateTime
 * }): object {
 *   return {
 *     isRunning: state.isRunning,
 *     ...(state.startTime && {
 *       startTime: serializeZonedDateTime(state.startTime)
 *     }),
 *     ...(state.pausedAt && {
 *       pausedAt: serializeZonedDateTime(state.pausedAt)
 *     })
 *   }
 * }
 *
 * // Null/undefined handling
 * serializeZonedDateTime(null)
 * // null
 *
 * serializeZonedDateTime(undefined)
 * // null
 *
 * // Invalid input handling
 * serializeZonedDateTime("not a zoned datetime")
 * // null
 *
 * serializeZonedDateTime(new Date())
 * // null
 *
 * // Batch serialization
 * function serializeZonedDateTimes(
 *   zdts: Array<Temporal.ZonedDateTime>
 * ): Array<object> {
 *   return zdts
 *     .map(serializeZonedDateTime)
 *     .filter((serialized): serialized is object => serialized !== null)
 * }
 *
 * // Round-trip example (serialize then deserialize)
 * function deserializeZonedDateTime(serialized: {
 *   instant: string
 *   timeZone: string
 *   calendar?: string
 * }): Temporal.ZonedDateTime {
 *   const instant = Temporal.Instant.from(serialized.instant)
 *   return instant.toZonedDateTimeISO(serialized.timeZone)
 *     .withCalendar(serialized.calendar || "iso8601")
 * }
 *
 * const original = Temporal.ZonedDateTime.from("2024-03-15T14:30:00[America/New_York]")
 * const serialized = serializeZonedDateTime(original)
 * if (serialized) {
 *   const restored = deserializeZonedDateTime(serialized)
 *   console.log(Temporal.ZonedDateTime.compare(original, restored) === 0) // true
 * }
 *
 * // Migration helper for legacy timestamps
 * function migrateLegacyTimestamp(
 *   legacyTimestamp: string,
 *   assumedTimeZone: string = "UTC"
 * ): object | null {
 *   try {
 *     const instant = Temporal.Instant.from(legacyTimestamp)
 *     const zdt = instant.toZonedDateTimeISO(assumedTimeZone)
 *     return serializeZonedDateTime(zdt)
 *   } catch {
 *     return null
 *   }
 * }
 *
 * // Cross-timezone meeting serialization
 * function serializeMeetingTimes(meeting: {
 *   title: string
 *   participants: Array<{ name: string; timeZone: string }>
 *   baseTime: Temporal.ZonedDateTime
 * }): object | null {
 *   const serializedBase = serializeZonedDateTime(meeting.baseTime)
 *   if (!serializedBase) return null
 *
 *   const participantTimes = meeting.participants.map(participant => ({
 *     name: participant.name,
 *     localTime: serializeZonedDateTime(
 *       meeting.baseTime.withTimeZone(participant.timeZone)
 *     )
 *   }))
 *
 *   return {
 *     title: meeting.title,
 *     baseTime: serializedBase,
 *     participantTimes
 *   }
 * }
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns null for invalid inputs
 * @property Complete - Preserves all timezone and calendar information
 * @property Reversible - Can be reconstructed back to ZonedDateTime
 * @property Standards - Uses ISO 8601 instant format for maximum compatibility
 */
const serializeZonedDateTime = (
	zonedDateTime: Temporal.ZonedDateTime | null | undefined,
): {
	instant: string
	timeZone: string
	calendar: string
	offset: string
	plainDateTime: string
	epochNanoseconds: string
} | null => {
	if (zonedDateTime == null) {
		return null
	}

	if (!(zonedDateTime instanceof Temporal.ZonedDateTime)) {
		return null
	}

	try {
		return {
			// ISO 8601 instant string (UTC) - universally compatible
			instant: zonedDateTime.toInstant().toString(),

			// Timezone identifier for reconstruction
			timeZone: zonedDateTime.timeZoneId,

			// Calendar system
			calendar: zonedDateTime.calendarId,

			// Current offset at this specific time (handles DST)
			offset: zonedDateTime.offset,

			// Local date/time representation
			plainDateTime: zonedDateTime.toPlainDateTime().toString(),

			// Nanoseconds since epoch for precise reconstruction
			epochNanoseconds: zonedDateTime.epochNanoseconds.toString(),
		}
	} catch {
		return null
	}
}

export default serializeZonedDateTime
