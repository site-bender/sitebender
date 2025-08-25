/**
 * Validates if a string is a valid UUID
 *
 * Checks whether a string represents a valid Universally Unique Identifier (UUID)
 * according to RFC 4122. Supports all UUID versions (1-5) and the nil UUID.
 * Validates the format including hyphens, version bits, and variant bits.
 * Returns true for valid UUIDs, false for invalid formats or non-string values.
 *
 * UUID validation rules:
 * - Must match the standard UUID format: xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
 * - 32 hexadecimal digits displayed in 5 groups separated by hyphens
 * - Groups of 8-4-4-4-12 characters
 * - M represents the version (1-5)
 * - N represents the variant (8, 9, A/a, or B/b for RFC 4122)
 * - Case-insensitive (accepts both uppercase and lowercase)
 * - Nil UUID (all zeros) is valid
 * - Validates structure but not uniqueness or generation method
 *
 * @param options - Optional configuration for validation behavior
 * @returns A predicate function that validates UUID strings
 * @example
 * ```typescript
 * // Basic UUID validation (any version)
 * const isValidUuid = isUuid()
 *
 * // Version 4 UUIDs (random)
 * isValidUuid("550e8400-e29b-41d4-a716-446655440000")  // true
 * isValidUuid("f47ac10b-58cc-4372-a567-0e02b2c3d479")  // true
 * isValidUuid("6ba7b810-9dad-11d1-80b4-00c04fd430c8")  // true
 *
 * // Uppercase UUIDs
 * isValidUuid("550E8400-E29B-41D4-A716-446655440000")  // true
 * isValidUuid("F47AC10B-58CC-4372-A567-0E02B2C3D479")  // true
 *
 * // Mixed case
 * isValidUuid("550e8400-E29B-41d4-A716-446655440000")  // true
 *
 * // Nil UUID
 * isValidUuid("00000000-0000-0000-0000-000000000000")  // true
 *
 * // Invalid UUIDs
 * isValidUuid("550e8400-e29b-41d4-a716-44665544000")   // false (wrong length)
 * isValidUuid("550e8400-e29b-41d4-a716-4466554400000") // false (too long)
 * isValidUuid("550e8400e29b41d4a716446655440000")      // false (no hyphens)
 * isValidUuid("550e8400_e29b_41d4_a716_446655440000")  // false (wrong separator)
 * isValidUuid("g50e8400-e29b-41d4-a716-446655440000")  // false (invalid hex)
 * isValidUuid("not-a-uuid")                            // false
 * isValidUuid("")                                      // false
 * isValidUuid(null)                                    // false
 * isValidUuid(undefined)                               // false
 * isValidUuid(123)                                     // false
 *
 * // Version-specific validation
 * const isUuidV4 = isUuid({ version: 4 })
 *
 * isUuidV4("550e8400-e29b-41d4-a716-446655440000")    // true (v4)
 * isUuidV4("550e8400-e29b-11d4-a716-446655440000")    // false (v1)
 * isUuidV4("550e8400-e29b-31d4-a716-446655440000")    // false (v3)
 * isUuidV4("550e8400-e29b-51d4-a716-446655440000")    // false (v5)
 *
 * // Multiple version support
 * const isUuidV4or5 = isUuid({ versions: [4, 5] })
 *
 * isUuidV4or5("550e8400-e29b-41d4-a716-446655440000") // true (v4)
 * isUuidV4or5("550e8400-e29b-51d4-a716-446655440000") // true (v5)
 * isUuidV4or5("550e8400-e29b-11d4-a716-446655440000") // false (v1)
 *
 * // Allow nil UUID
 * const isNonNilUuid = isUuid({ allowNil: false })
 *
 * isNonNilUuid("550e8400-e29b-41d4-a716-446655440000") // true
 * isNonNilUuid("00000000-0000-0000-0000-000000000000") // false (nil)
 *
 * // Database ID validation
 * interface User {
 *   id: string
 *   name: string
 *   email: string
 * }
 *
 * function validateUserId(id: unknown): string | null {
 *   if (typeof id !== "string") {
 *     return "ID must be a string"
 *   }
 *
 *   const isValidId = isUuid({ version: 4 })
 *   if (!isValidId(id)) {
 *     return "ID must be a valid UUID v4"
 *   }
 *
 *   return null
 * }
 *
 * // API request validation
 * interface ApiRequest {
 *   requestId: string
 *   timestamp: number
 *   payload: any
 * }
 *
 * function validateApiRequest(request: ApiRequest): boolean {
 *   const isValidRequestId = isUuid()
 *   return isValidRequestId(request.requestId)
 * }
 *
 * // Session token validation
 * const isSessionToken = isUuid({
 *   version: 4,
 *   allowNil: false
 * })
 *
 * function validateSession(token: string): boolean {
 *   return isSessionToken(token)
 * }
 *
 * // Filtering valid UUIDs
 * const ids = [
 *   "550e8400-e29b-41d4-a716-446655440000",
 *   "invalid-id",
 *   "f47ac10b-58cc-4372-a567-0e02b2c3d479",
 *   "123456",
 *   "00000000-0000-0000-0000-000000000000"
 * ]
 *
 * const validIds = ids.filter(isUuid())
 * // ["550e8400-e29b-41d4-a716-446655440000", "f47ac10b-58cc-4372-a567-0e02b2c3d479", "00000000-0000-0000-0000-000000000000"]
 *
 * const nonNilIds = ids.filter(isUuid({ allowNil: false }))
 * // ["550e8400-e29b-41d4-a716-446655440000", "f47ac10b-58cc-4372-a567-0e02b2c3d479"]
 *
 * // Transaction ID validation
 * interface Transaction {
 *   id: string
 *   amount: number
 *   status: string
 * }
 *
 * function getValidTransactions(
 *   transactions: Array<Transaction>
 * ): Array<Transaction> {
 *   const isValidTxId = isUuid({ version: 4 })
 *
 *   return transactions.filter(tx => isValidTxId(tx.id))
 * }
 *
 * // Correlation ID tracking
 * interface LogEntry {
 *   correlationId: string
 *   message: string
 *   level: string
 * }
 *
 * function groupByCorrelation(
 *   logs: Array<LogEntry>
 * ): Map<string, Array<LogEntry>> {
 *   const isValidCorrelationId = isUuid()
 *   const grouped = new Map<string, Array<LogEntry>>()
 *
 *   for (const log of logs) {
 *     if (isValidCorrelationId(log.correlationId)) {
 *       if (!grouped.has(log.correlationId)) {
 *         grouped.set(log.correlationId, [])
 *       }
 *       grouped.get(log.correlationId)!.push(log)
 *     }
 *   }
 *
 *   return grouped
 * }
 *
 * // Device ID validation
 * const isDeviceId = isUuid({
 *   versions: [1, 4],  // v1 for MAC-based, v4 for random
 *   allowNil: false
 * })
 *
 * interface Device {
 *   deviceId: string
 *   type: string
 *   lastSeen: Date
 * }
 *
 * function validateDevice(device: Device): boolean {
 *   return isDeviceId(device.deviceId)
 * }
 *
 * // Resource identifier validation
 * interface Resource {
 *   urn: string
 *   type: string
 * }
 *
 * function extractUuidFromUrn(urn: string): string | null {
 *   // URN format: urn:uuid:550e8400-e29b-41d4-a716-446655440000
 *   const parts = urn.split(":")
 *
 *   if (parts.length >= 3 && parts[1] === "uuid") {
 *     const uuid = parts[2]
 *     const isValidResourceId = isUuid()
 *
 *     if (isValidResourceId(uuid)) {
 *       return uuid
 *     }
 *   }
 *
 *   return null
 * }
 *
 * // Migration script validation
 * interface Migration {
 *   id: string
 *   name: string
 *   appliedAt?: Date
 * }
 *
 * function validateMigrations(
 *   migrations: Array<Migration>
 * ): {
 *   valid: Array<Migration>
 *   invalid: Array<Migration>
 * } {
 *   const isMigrationId = isUuid({ allowNil: false })
 *
 *   return {
 *     valid: migrations.filter(m => isMigrationId(m.id)),
 *     invalid: migrations.filter(m => !isMigrationId(m.id))
 *   }
 * }
 *
 * // File upload tracking
 * interface Upload {
 *   uploadId: string
 *   filename: string
 *   size: number
 * }
 *
 * function generateUploadReport(uploads: Array<Upload>): {
 *   total: number
 *   validIds: number
 *   invalidIds: Array<string>
 * } {
 *   const isUploadId = isUuid({ version: 4 })
 *
 *   const invalidIds = uploads
 *     .filter(u => !isUploadId(u.uploadId))
 *     .map(u => u.uploadId)
 *
 *   return {
 *     total: uploads.length,
 *     validIds: uploads.length - invalidIds.length,
 *     invalidIds
 *   }
 * }
 *
 * // OAuth state validation
 * const isOAuthState = isUuid({
 *   version: 4,
 *   allowNil: false
 * })
 *
 * function validateOAuthCallback(
 *   state: string,
 *   storedState: string
 * ): boolean {
 *   return isOAuthState(state) &&
 *          isOAuthState(storedState) &&
 *          state === storedState
 * }
 *
 * // Webhook event validation
 * interface WebhookEvent {
 *   eventId: string
 *   type: string
 *   timestamp: number
 * }
 *
 * function processWebhookEvents(
 *   events: Array<WebhookEvent>
 * ): Array<WebhookEvent> {
 *   const isEventId = isUuid()
 *
 *   // Only process events with valid UUIDs
 *   return events.filter(event => {
 *     if (!isEventId(event.eventId)) {
 *       console.warn(`Invalid event ID: ${event.eventId}`)
 *       return false
 *     }
 *     return true
 *   })
 * }
 *
 * // Cache key validation
 * function createCacheKey(id: string, prefix: string = ""): string | null {
 *   const isValidCacheId = isUuid()
 *
 *   if (!isValidCacheId(id)) {
 *     return null
 *   }
 *
 *   return prefix ? `${prefix}:${id}` : id
 * }
 *
 * // Batch job validation
 * interface BatchJob {
 *   jobId: string
 *   status: "pending" | "running" | "completed" | "failed"
 * }
 *
 * function getRunningJobs(jobs: Array<BatchJob>): Array<string> {
 *   const isJobId = isUuid({ allowNil: false })
 *
 *   return jobs
 *     .filter(job => job.status === "running" && isJobId(job.jobId))
 *     .map(job => job.jobId)
 * }
 *
 * // Idempotency key validation
 * const isIdempotencyKey = isUuid({
 *   version: 4,
 *   allowNil: false
 * })
 *
 * interface PaymentRequest {
 *   idempotencyKey: string
 *   amount: number
 *   currency: string
 * }
 *
 * function validatePaymentRequest(request: PaymentRequest): {
 *   valid: boolean
 *   error?: string
 * } {
 *   if (!isIdempotencyKey(request.idempotencyKey)) {
 *     return {
 *       valid: false,
 *       error: "Invalid idempotency key format"
 *     }
 *   }
 *
 *   return { valid: true }
 * }
 * ```
 *
 * @property Curried - Returns a predicate function for reuse
 * @property Pure - No side effects, returns consistent results
 * @property RFC-compliant - Follows RFC 4122 specification
 * @property Version-aware - Can validate specific UUID versions
 * @property Case-insensitive - Accepts both uppercase and lowercase
 * @property Safe - Returns false for invalid inputs instead of throwing
 */
type UuidOptions = {
	version?: 1 | 2 | 3 | 4 | 5
	versions?: Array<1 | 2 | 3 | 4 | 5>
	allowNil?: boolean
}

const isUuid = (options: UuidOptions = {}): (value: unknown) => boolean => {
	return (value: unknown): boolean => {
		if (typeof value !== "string") {
			return false
		}

		// UUID regex pattern
		// xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
		// M = version (1-5)
		// N = variant (8, 9, A, or B for RFC 4122)
		const uuidPattern =
			/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

		// Nil UUID pattern
		const nilPattern = /^00000000-0000-0000-0000-000000000000$/i

		// Check if it's nil UUID
		if (nilPattern.test(value)) {
			return options.allowNil !== false
		}

		// Check basic format
		if (!uuidPattern.test(value)) {
			return false
		}

		// Extract version from the UUID
		const versionChar = value[14]
		const version = parseInt(versionChar, 10) as 1 | 2 | 3 | 4 | 5

		// Check version constraints
		if (options.version !== undefined) {
			return version === options.version
		}

		if (options.versions && options.versions.length > 0) {
			return options.versions.includes(version)
		}

		// Valid UUID of any version
		return true
	}
}

export default isUuid
