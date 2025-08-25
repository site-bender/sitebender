/**
 * Executes async functions in series, passing each result to the next function
 *
 * Runs a series of async functions where each function receives the result of
 * the previous function as its input. The first function receives the initial
 * value, and the final result is the output of the last function. This creates
 * a pipeline of async transformations. If any function rejects, the entire
 * operation stops and rejects immediately.
 *
 * @curried (initial) => (tasks) => Promise<T>
 * @param initial - The initial value passed to the first function
 * @param tasks - Array of async functions that transform the previous result
 * @returns Promise resolving to the final transformed result
 * @example
 * ```typescript
 * // Basic waterfall pipeline
 * const result = await waterfall(5)([
 *   async (n) => n * 2,      // 10
 *   async (n) => n + 3,       // 13
 *   async (n) => n.toString() // "13"
 * ])
 * console.log(result) // "13"
 *
 * // Data processing pipeline
 * const processUser = await waterfall({ id: 123 })([
 *   async (user) => {
 *     // Fetch full user data
 *     const fullUser = await db.users.findById(user.id)
 *     return fullUser
 *   },
 *   async (user) => {
 *     // Add user's posts
 *     const posts = await db.posts.findByUserId(user.id)
 *     return { ...user, posts }
 *   },
 *   async (userWithPosts) => {
 *     // Add comment count
 *     const commentCount = await db.comments.countByUserId(userWithPosts.id)
 *     return { ...userWithPosts, commentCount }
 *   },
 *   async (enrichedUser) => {
 *     // Format for response
 *     return {
 *       id: enrichedUser.id,
 *       name: enrichedUser.name,
 *       postCount: enrichedUser.posts.length,
 *       commentCount: enrichedUser.commentCount
 *     }
 *   }
 * ])
 *
 * // Empty array returns initial value
 * const unchanged = await waterfall("initial")([])
 * console.log(unchanged) // "initial"
 *
 * // Error handling - stops on first error
 * try {
 *   await waterfall(10)([
 *     async (n) => n * 2,  // 20
 *     async (n) => { throw new Error("Failed!") },
 *     async (n) => n + 1   // Never runs
 *   ])
 * } catch (err) {
 *   console.error(err.message) // "Failed!"
 * }
 *
 * // File processing pipeline
 * const processFile = waterfall("/path/to/file.txt")([
 *   async (path) => {
 *     console.log(`Reading ${path}...`)
 *     return readFile(path)
 *   },
 *   async (content) => {
 *     console.log(`Parsing content (${content.length} bytes)...`)
 *     return JSON.parse(content)
 *   },
 *   async (data) => {
 *     console.log(`Validating ${data.records?.length} records...`)
 *     if (!validateData(data)) {
 *       throw new Error("Invalid data format")
 *     }
 *     return data
 *   },
 *   async (validData) => {
 *     console.log("Transforming data...")
 *     return transformData(validData)
 *   },
 *   async (transformed) => {
 *     console.log("Saving to database...")
 *     return db.save(transformed)
 *   }
 * ])
 *
 * const result = await processFile
 * console.log("Processing complete:", result)
 *
 * // API request chain
 * const fetchUserProfile = waterfall("user123")([
 *   async (userId) => {
 *     const token = await getAuthToken()
 *     return { userId, token }
 *   },
 *   async ({ userId, token }) => {
 *     const response = await fetch(`/api/users/${userId}`, {
 *       headers: { Authorization: `Bearer ${token}` }
 *     })
 *     return response.json()
 *   },
 *   async (userData) => {
 *     const avatar = await fetch(userData.avatarUrl)
 *     const avatarBlob = await avatar.blob()
 *     return { ...userData, avatar: avatarBlob }
 *   }
 * ])
 *
 * // Mathematical operations pipeline
 * const calculate = waterfall(100)([
 *   async (n) => n / 2,        // 50
 *   async (n) => Math.sqrt(n),  // ~7.07
 *   async (n) => Math.floor(n), // 7
 *   async (n) => n ** 2,        // 49
 * ])
 *
 * console.log(await calculate) // 49
 *
 * // String transformation pipeline
 * const processText = waterfall("  Hello WORLD  ")([
 *   async (s) => s.trim(),           // "Hello WORLD"
 *   async (s) => s.toLowerCase(),    // "hello world"
 *   async (s) => s.split(" "),       // ["hello", "world"]
 *   async (arr) => arr.map(w =>
 *     w.charAt(0).toUpperCase() + w.slice(1)
 *   ),                               // ["Hello", "World"]
 *   async (arr) => arr.join(" ")     // "Hello World"
 * ])
 *
 * console.log(await processText) // "Hello World"
 *
 * // Conditional pipeline
 * const conditionalProcess = waterfall({ value: 10, skip: false })([
 *   async (data) => {
 *     if (data.skip) return data
 *     return { ...data, value: data.value * 2 }
 *   },
 *   async (data) => {
 *     if (data.skip) return data
 *     return { ...data, value: data.value + 5 }
 *   },
 *   async (data) => {
 *     return data.value
 *   }
 * ])
 *
 * // Build deployment pipeline
 * const deployApp = waterfall({
 *   projectDir: "./my-app",
 *   environment: "production"
 * })([
 *   async (config) => {
 *     console.log("Running tests...")
 *     const testResults = await runTests(config.projectDir)
 *     if (!testResults.passed) {
 *       throw new Error("Tests failed")
 *     }
 *     return { ...config, testResults }
 *   },
 *   async (config) => {
 *     console.log("Building application...")
 *     const buildArtifact = await buildApp(config.projectDir)
 *     return { ...config, artifact: buildArtifact }
 *   },
 *   async (config) => {
 *     console.log("Uploading to CDN...")
 *     const cdnUrl = await uploadToCDN(config.artifact)
 *     return { ...config, cdnUrl }
 *   },
 *   async (config) => {
 *     console.log("Updating load balancer...")
 *     await updateLoadBalancer(config.environment, config.cdnUrl)
 *     return { ...config, deployed: true }
 *   },
 *   async (config) => {
 *     console.log("Sending notifications...")
 *     await notifyTeam(`Deployed to ${config.environment}: ${config.cdnUrl}`)
 *     return config
 *   }
 * ])
 *
 * // Partial application for reusable pipelines
 * const parseJson = waterfall<string, any>()([
 *   async (str: string) => {
 *     try {
 *       return JSON.parse(str)
 *     } catch {
 *       throw new Error("Invalid JSON")
 *     }
 *   }
 * ])
 *
 * const result1 = await parseJson('{"key": "value"}')
 * const result2 = await parseJson('[1, 2, 3]')
 *
 * // Database transaction pipeline
 * const transferMoney = waterfall({
 *   from: "account1",
 *   to: "account2",
 *   amount: 100
 * })([
 *   async (transfer) => {
 *     const tx = await db.beginTransaction()
 *     return { ...transfer, tx }
 *   },
 *   async ({ tx, from, amount, ...rest }) => {
 *     await tx.debit(from, amount)
 *     return { ...rest, tx, from, amount }
 *   },
 *   async ({ tx, to, amount, ...rest }) => {
 *     await tx.credit(to, amount)
 *     return { ...rest, tx, to, amount }
 *   },
 *   async ({ tx, ...transfer }) => {
 *     await tx.commit()
 *     return transfer
 *   }
 * ])
 *
 * // Image processing pipeline
 * const processImage = waterfall<File, ProcessedImage>()([
 *   async (file: File) => {
 *     const buffer = await file.arrayBuffer()
 *     return new Uint8Array(buffer)
 *   },
 *   async (buffer) => {
 *     const image = await decodeImage(buffer)
 *     return image
 *   },
 *   async (image) => {
 *     const resized = await resizeImage(image, 800, 600)
 *     return resized
 *   },
 *   async (image) => {
 *     const compressed = await compressImage(image, 0.8)
 *     return compressed
 *   },
 *   async (image) => {
 *     const url = await uploadImage(image)
 *     return { url, size: image.byteLength }
 *   }
 * ])
 *
 * // Async generator pipeline
 * const generateReport = waterfall(["user1", "user2", "user3"])([
 *   async (userIds) => {
 *     const users = await Promise.all(
 *       userIds.map(id => fetchUser(id))
 *     )
 *     return users
 *   },
 *   async (users) => {
 *     const activities = await Promise.all(
 *       users.map(u => fetchActivities(u.id))
 *     )
 *     return { users, activities }
 *   },
 *   async ({ users, activities }) => {
 *     const report = generateActivityReport(users, activities)
 *     return report
 *   },
 *   async (report) => {
 *     const pdf = await convertToPDF(report)
 *     return pdf
 *   }
 * ])
 *
 * // Type transformations preserved
 * const typedWaterfall = waterfall(5)([
 *   async (n: number) => n.toString(),     // number -> string
 *   async (s: string) => s.length,         // string -> number
 *   async (n: number) => n > 0,            // number -> boolean
 *   async (b: boolean) => b ? "yes" : "no" // boolean -> string
 * ])
 * // Final type is string
 * ```
 * @property Pipeline - Each function transforms the previous result
 * @property Sequential - Functions execute one after another
 * @property Type-transforming - Can change types through the pipeline
 */
const waterfall =
	<I, O = I>(initial: I) =>
	async <T extends ReadonlyArray<(arg: any) => Promise<any>>>(
		tasks: T,
	): Promise<
		T extends ReadonlyArray<(...args: any[]) => Promise<infer R>> ? R
			: O
	> => {
		// Handle empty array - return initial value
		if (tasks.length === 0) {
			return initial as any
		}

		// Execute tasks in sequence, passing results along
		let result: any = initial

		for (const task of tasks) {
			try {
				result = await task(result)
			} catch (error) {
				// Fail fast on first error
				throw error
			}
		}

		return result
	}

export default waterfall
