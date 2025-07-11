# Testing Guidelines

This document covers testing practices, patterns, and tools. For core philosophy and principles, see [essentials.md](./essentials.md). For development practices, see [development.md](./development.md). For deployment, see [deployment.md](./deployment.md).

## 🚨 CRITICAL: Behavioral Test Entry Point

**CURRENT SETUP**: Behavioral tests start from `/backstage` because `/` shows a placeholder "Nothing to see here" page.

**BEFORE PRODUCTION**: All behavioral tests MUST be updated to start from `/` when the real home page is implemented. See `docs/production-readiness-checklist.md` for complete requirements.

**CURRENT BEHAVIORAL TESTS**: 
- `tests/tasks/information-access/access-about-information/index.test.ts` - Uses `/backstage` as entry point with TODO comments for home page transition

## Behavior-Driven Development - THE FUNDAMENTAL PRACTICE

**CRITICAL**: BDD is not optional. Every feature, every bug fix, every change MUST follow this process. See [development.md](./development.md) for the complete BDD workflow.

### Test Categories and Execution Speed

**Speed Hierarchy** (run tests in this order, optimized for feedback loops):

1. **Unit tests** (< 1ms each) - Pure function tests, no I/O
2. **Integration tests** (< 100ms each) - Database operations, API calls
3. **End-to-end tests** (< 5s each) - Full user workflows with Playwright

**Parallel Test Execution:**

```typescript
// Deno test configuration for parallel execution
// Run fast tests first, slow tests last

// Unit tests - run in parallel with high concurrency
Deno.test({
  name: "Pure function tests",
  fn: async (t) => {
    await t.step("calculateDiscount applies correct rate", () => {
      // Pure function test - runs in ~0.1ms
    });
    await t.step("formatCurrency handles edge cases", () => {
      // Another pure function test
    });
  },
  permissions: { net: false, read: false, write: false }, // No I/O needed
});

// Integration tests - limited concurrency
Deno.test({
  name: "Database operations",
  fn: async (t) => {
    await t.step("createUser inserts correctly", async () => {
      // Database test - runs in ~50ms
    });
    await t.step("getUserById returns user", async () => {
      // Another database test
    });
  },
  permissions: { net: true, read: true, env: true }, // Database access needed
});

// E2E tests - run sequentially
Deno.test({
  name: "User registration flow",
  fn: async () => {
    // Playwright test - runs in ~3s
  },
  permissions: { net: true, read: true, write: true, run: true },
});
```

## Property-Based Testing with fast-check

**Property-based testing** generates hundreds of random inputs to find edge cases that example-based tests miss. Use fast-check extensively, especially for:

- **Pure functions** (mathematical operations, transformations, validators)
- **Serialization/deserialization** 
- **API contracts** (ensuring consistent behavior across input variations)
- **Business logic invariants** (rules that must always hold true)

**fast-check is fully compatible with Deno test** and should be used alongside example-based tests.

### When to Use Property-Based Testing

```typescript
import { assertEquals, assertThrows } from "https://deno.land/std@0.208.0/assert/mod.ts";
import * as fc from "https://cdn.skypack.dev/fast-check@3.13.0";

// ✅ GOOD - Property-based testing for pure functions
Deno.test("validateEmail property tests", async (t) => {
  await t.step("should accept all valid email formats", () => {
    fc.assert(
      fc.property(
        fc.emailAddress(), // Built-in generator for valid emails
        (email: string) => {
          assertEquals(validateEmail(email), true);
        }
      )
    );
  });

  await t.step("should reject strings without @ symbol", () => {
    fc.assert(
      fc.property(
        fc.string().filter(s => !s.includes("@")),
        (invalidEmail: string) => {
          assertEquals(validateEmail(invalidEmail), false);
        }
      )
    );
  });

  // Combine with example-based tests for known edge cases
  await t.step("should handle specific edge cases", () => {
    assertEquals(validateEmail("user@domain.com"), true);
    assertEquals(validateEmail(""), false);
    assertEquals(validateEmail("@domain.com"), false);
  });
});

// ✅ GOOD - Property-based testing for business logic invariants
Deno.test("Order total calculation invariants", async (t) => {
  await t.step("total should always equal items + shipping", () => {
    fc.assert(
      fc.property(
        fc.array(fc.record({
          price: fc.float({ min: 0.01, max: 1000 }),
          quantity: fc.integer({ min: 1, max: 10 })
        })),
        fc.float({ min: 0, max: 50 }), // shipping cost
        (items, shippingCost) => {
          const order = { items, shippingCost };
          const processed = processOrder(order);
          
          const expectedItemsTotal = items.reduce(
            (sum, item) => sum + (item.price * item.quantity), 
            0
          );
          const expectedTotal = expectedItemsTotal + shippingCost;
          
          assertEquals(processed.total, expectedTotal);
        }
      )
    );
  });
});

// ✅ GOOD - Custom generators for domain objects
const arbitraryUser = fc.record({
  id: fc.uuidV4(),
  email: fc.emailAddress(),
  name: fc.string({ minLength: 1, maxLength: 100 }),
  age: fc.integer({ min: 13, max: 120 }),
  isActive: fc.boolean(),
});

Deno.test("User serialization round-trip", async (t) => {
  await t.step("serialized user should deserialize to original", () => {
    fc.assert(
      fc.property(arbitraryUser, (user) => {
        const serialized = JSON.stringify(user);
        const deserialized = JSON.parse(serialized);
        assertEquals(deserialized, user);
      })
    );
  });
});

// ❌ AVOID - Property-based testing for complex integration scenarios
// (Use example-based tests instead)
Deno.test("Payment processing - use example-based tests", async (t) => {
  await t.step("should process valid payment", async () => {
    // Complex setup with database, external APIs, etc.
    // Property-based testing adds complexity without clear benefit here
    const payment = getMockPayment();
    const result = await processPayment(payment);
    assertEquals(result.status, "completed");
  });
});
```

### Advanced fast-check Patterns

```typescript
import * as fc from "https://cdn.skypack.dev/fast-check@3.13.0";

// Shrinking - fast-check automatically minimizes failing cases
Deno.test("String parsing with automatic shrinking", async (t) => {
  await t.step("should handle malformed input gracefully", () => {
    fc.assert(
      fc.property(
        fc.string(), // If this fails, fast-check will find the minimal failing string
        (input: string) => {
          const result = parseUserInput(input);
          // Property: parsing should never throw, always return a result
          assertEquals(typeof result, "object");
          assertEquals("error" in result || "data" in result, true);
        }
      )
    );
  });
});

// Custom constraints and filtering
Deno.test("Age validation with custom constraints", async (t) => {
  await t.step("valid ages should always pass validation", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 13, max: 120 }), // Only generate valid ages
        (age: number) => {
          assertEquals(validateAge(age), true);
        }
      )
    );
  });

  await t.step("invalid ages should always fail validation", () => {
    fc.assert(
      fc.property(
        fc.integer().filter(n => n < 13 || n > 120), // Only invalid ages
        (age: number) => {
          assertEquals(validateAge(age), false);
        }
      )
    );
  });
});

// Stateful testing for complex workflows
type Model = {
  balance: number;
  transactions: Transaction[];
};

const commands = [
  fc.record({
    type: fc.constant("deposit" as const),
    amount: fc.float({ min: 0.01, max: 1000 }),
  }),
  fc.record({
    type: fc.constant("withdraw" as const),
    amount: fc.float({ min: 0.01, max: 1000 }),
  }),
];

Deno.test("Bank account stateful testing", async (t) => {
  await t.step("account operations maintain balance invariants", () => {
    fc.assert(
      fc.property(
        fc.array(fc.oneof(...commands)), // Generate sequence of operations
        (operations) => {
          const account = createAccount();
          let modelBalance = 0;

          for (const op of operations) {
            if (op.type === "deposit") {
              account.deposit(op.amount);
              modelBalance += op.amount;
            } else if (op.type === "withdraw" && modelBalance >= op.amount) {
              account.withdraw(op.amount);
              modelBalance -= op.amount;
            }
            
            // Invariant: account balance should match model
            assertEquals(account.getBalance(), modelBalance);
          }
        }
      )
    );
  });
});
```

## Mock Service Worker (MSW) for API Testing

MSW intercepts network requests at the service worker level, providing realistic API mocking that works consistently across all environments. **MSW v2 is fully compatible with Deno** and provides better type safety.

### MSW Setup and Usage

```typescript
// test/mocks/handlers.ts
import { http, HttpResponse } from "https://esm.sh/msw@2.0.0";
import type { User } from "@/types/database/index.ts";

export const handlers = [
  // REST API handlers
  http.get("/api/users/:id", ({ params }) => {
    const { id } = params;
    
    const user: User = {
      id: id as string,
      email: "test@example.com",
      name: "Test User",
      createdAt: new Date(),
    };

    return HttpResponse.json(user);
  }),

  http.post("/api/users", async ({ request }) => {
    const userData = await request.json() as Partial<User>;
    
    const newUser: User = {
      id: "user_123",
      email: userData.email!,
      name: userData.name!,
      createdAt: new Date(),
    };

    return HttpResponse.json(newUser, { status: 201 });
  }),

  // External API handlers
  http.post("https://api.stripe.com/v1/payment_intents", () => {
    return HttpResponse.json({
      id: "pi_test_123",
      status: "requires_payment_method",
      amount: 2000,
      currency: "gbp",
    });
  }),

  // Error scenarios
  http.get("/api/users/error", () => {
    return new HttpResponse(null, { 
      status: 500,
      statusText: "Internal Server Error"
    });
  }),
];
```

```typescript
// test/setup.ts
import { setupServer } from "https://esm.sh/msw@2.0.0/node";
import { handlers } from "./mocks/handlers.ts";

// Create MSW server instance
export const server = setupServer(...handlers);

// Global setup for all tests
export const setupMSW = () => {
  // Start server before all tests
  server.listen({
    onUnhandledRequest: "warn", // Warn about unmocked requests
  });
};

export const teardownMSW = () => {
  // Clean up after all tests
  server.close();
};

export const resetMSW = () => {
  // Reset handlers between tests
  server.resetHandlers();
};
```

```typescript
// test/api/user.test.ts
import { assertEquals, assertRejects } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { setupMSW, teardownMSW, resetMSW, server } from "../setup.ts";
import { http, HttpResponse } from "https://esm.sh/msw@2.0.0";
import { fetchUser, createUser } from "@/api/user.ts";

// Setup MSW for this test file
Deno.test("User API tests", async (t) => {
  setupMSW();

  await t.step("fetchUser returns user data", async () => {
    const user = await fetchUser("123");
    
    assertEquals(user.id, "123");
    assertEquals(user.email, "test@example.com");
    assertEquals(user.name, "Test User");
  });

  await t.step("createUser posts data correctly", async () => {
    const userData = {
      email: "new@example.com",
      name: "New User",
    };

    const newUser = await createUser(userData);
    
    assertEquals(newUser.id, "user_123");
    assertEquals(newUser.email, userData.email);
    assertEquals(newUser.name, userData.name);
  });

  await t.step("handles API errors gracefully", async () => {
    await assertRejects(
      () => fetchUser("error"),
      Error,
      "Failed to fetch user"
    );
  });

  await t.step("can override handlers for specific tests", async () => {
    // Override handler for this test only
    server.use(
      http.get("/api/users/:id", () => {
        return HttpResponse.json({
          id: "custom_id",
          email: "custom@example.com",
          name: "Custom User",
        });
      })
    );

    const user = await fetchUser("123");
    assertEquals(user.id, "custom_id");
    assertEquals(user.email, "custom@example.com");

    // Reset to original handlers
    resetMSW();
  });

  teardownMSW();
});
```

### MSW Best Practices

```typescript
// ✅ GOOD - Type-safe mock responses using real database types
import type { User, PaymentRequest } from "@/types/database/index.ts";

const userHandler = http.get("/api/users/:id", ({ params }) => {
  const user: User = { // Use real types, not redefined ones
    id: params.id as string,
    email: "test@example.com",
    name: "Test User",
    createdAt: new Date(),
  };
  return HttpResponse.json(user);
});

// ✅ GOOD - Realistic error responses
const errorHandler = http.get("/api/users/not-found", () => {
  return HttpResponse.json(
    { error: "User not found", code: "USER_NOT_FOUND" },
    { status: 404 }
  );
});

// ✅ GOOD - Request validation in handlers
const createUserHandler = http.post("/api/users", async ({ request }) => {
  const body = await request.json();
  
  // Validate request structure
  if (!body.email || !body.name) {
    return HttpResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const newUser: User = {
    id: `user_${Date.now()}`,
    email: body.email,
    name: body.name,
    createdAt: new Date(),
  };

  return HttpResponse.json(newUser, { status: 201 });
});

// ✅ GOOD - Testing different response states
Deno.test("Payment processing with different states", async (t) => {
  await t.step("handles successful payment", async () => {
    server.use(
      http.post("/api/payments", () => {
        return HttpResponse.json({
          id: "payment_success",
          status: "completed",
        });
      })
    );

    const result = await processPayment({ amount: 1000 });
    assertEquals(result.status, "completed");
  });

  await t.step("handles pending payment", async () => {
    server.use(
      http.post("/api/payments", () => {
        return HttpResponse.json({
          id: "payment_pending",
          status: "pending",
        });
      })
    );

    const result = await processPayment({ amount: 1000 });
    assertEquals(result.status, "pending");
  });

  await t.step("handles failed payment", async () => {
    server.use(
      http.post("/api/payments", () => {
        return HttpResponse.json(
          {
            error: "Payment failed",
            code: "INSUFFICIENT_FUNDS",
          },
          { status: 402 }
        );
      })
    );

    await assertRejects(
      () => processPayment({ amount: 1000 }),
      Error,
      "Payment failed"
    );
  });
});
```

## Playwright Model Context Protocol (MCP) for E2E Testing

Playwright MCP provides AI-powered browser automation that's **fully compatible with Deno**. It uses natural language to describe user interactions, making tests more maintainable and readable.

### Playwright MCP Setup

```typescript
// test/e2e/setup.ts
import { chromium, type Browser, type BrowserContext } from "https://esm.sh/playwright@1.40.0";
import { PlaywrightMCP } from "https://esm.sh/@playwright/mcp@1.0.0";

export let browser: Browser;
export let context: BrowserContext;
export let mcp: PlaywrightMCP;

export const setupE2E = async () => {
  browser = await chromium.launch({
    headless: Deno.env.get("CI") === "true", // Headless in CI, headed locally
  });
  
  context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    locale: "en-GB",
  });

  mcp = new PlaywrightMCP(context);
};

export const teardownE2E = async () => {
  await context?.close();
  await browser?.close();
};
```

### MCP-Powered E2E Tests

```typescript
// test/e2e/user-registration.test.ts
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { setupE2E, teardownE2E, mcp } from "./setup.ts";

Deno.test("User registration flow", async (t) => {
  await setupE2E();

  await t.step("user can register with valid information", async () => {
    // Natural language instructions - MCP converts to Playwright actions
    await mcp.goto("http://localhost:3000/register");
    
    await mcp.fill("email input", "newuser@example.com");
    await mcp.fill("password input", "SecurePassword123!");
    await mcp.fill("confirm password input", "SecurePassword123!");
    await mcp.fill("full name input", "Test User");
    
    await mcp.click("register button");
    
    // Wait for navigation and verify success
    await mcp.waitForText("Registration successful");
    await mcp.expectVisible("welcome message");
    
    // Verify URL change
    const currentUrl = await mcp.getCurrentUrl();
    assertEquals(currentUrl.includes("/dashboard"), true);
  });

  await t.step("shows error for invalid email", async () => {
    await mcp.goto("http://localhost:3000/register");
    
    await mcp.fill("email input", "invalid-email");
    await mcp.fill("password input", "SecurePassword123!");
    await mcp.click("register button");
    
    await mcp.waitForText("Please enter a valid email address");
    await mcp.expectVisible("error message");
  });

  await t.step("shows error for mismatched passwords", async () => {
    await mcp.goto("http://localhost:3000/register");
    
    await mcp.fill("email input", "test@example.com");
    await mcp.fill("password input", "SecurePassword123!");
    await mcp.fill("confirm password input", "DifferentPassword!");
    await mcp.click("register button");
    
    await mcp.waitForText("Passwords do not match");
  });

  await teardownE2E();
});

// Complex user interactions with MCP
Deno.test("Shopping cart workflow", async (t) => {
  await setupE2E();

  await t.step("user can add items to cart and checkout", async () => {
    await mcp.goto("http://localhost:3000/products");
    
    // Add multiple items to cart
    await mcp.click("add to cart button for 'Widget A'");
    await mcp.waitForText("Widget A added to cart");
    
    await mcp.click("add to cart button for 'Widget B'");
    await mcp.waitForText("Widget B added to cart");
    
    // Navigate to cart
    await mcp.click("cart icon");
    await mcp.waitForText("Your Cart");
    
    // Verify items are in cart
    await mcp.expectVisible("Widget A in cart");
    await mcp.expectVisible("Widget B in cart");
    
    // Update quantity
    await mcp.fill("quantity input for 'Widget A'", "2");
    await mcp.waitForText("Cart updated");
    
    // Proceed to checkout
    await mcp.click("checkout button");
    await mcp.waitForText("Checkout");
    
    // Fill checkout form
    await mcp.fill("billing address", "123 Test Street");
    await mcp.fill("city", "London");
    await mcp.fill("postcode", "SW1A 1AA");
    await mcp.select("country", "United Kingdom");
    
    // Complete purchase
    await mcp.click("complete purchase button");
    await mcp.waitForText("Order confirmed");
    
    // Verify order confirmation
    await mcp.expectVisible("order confirmation number");
    await mcp.expectVisible("order summary");
  });

  await teardownE2E();
});
```

### Advanced MCP Patterns

```typescript
// Page object model with MCP
export class RegistrationPageMCP {
  constructor(private mcp: PlaywrightMCP) {}

  async goto() {
    await this.mcp.goto("http://localhost:3000/register");
  }

  async fillForm(data: {
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
  }) {
    await this.mcp.fill("email input", data.email);
    await this.mcp.fill("password input", data.password);
    await this.mcp.fill("confirm password input", data.confirmPassword);
    await this.mcp.fill("full name input", data.fullName);
  }

  async submit() {
    await this.mcp.click("register button");
  }

  async expectSuccess() {
    await this.mcp.waitForText("Registration successful");
    await this.mcp.expectVisible("welcome message");
  }

  async expectError(message: string) {
    await this.mcp.waitForText(message);
    await this.mcp.expectVisible("error message");
  }
}

// Use page objects in tests
Deno.test("Registration with page objects", async (t) => {
  await setupE2E();
  const registrationPage = new RegistrationPageMCP(mcp);

  await t.step("successful registration", async () => {
    await registrationPage.goto();
    await registrationPage.fillForm({
      email: "test@example.com",
      password: "SecurePassword123!",
      confirmPassword: "SecurePassword123!",
      fullName: "Test User",
    });
    await registrationPage.submit();
    await registrationPage.expectSuccess();
  });

  await teardownE2E();
});

// Visual regression testing with MCP
Deno.test("Visual regression tests", async (t) => {
  await setupE2E();

  await t.step("dashboard layout matches baseline", async () => {
    await mcp.goto("http://localhost:3000/dashboard");
    await mcp.waitForText("Dashboard");
    
    // Take screenshot and compare
    const screenshot = await mcp.screenshot({
      name: "dashboard-layout",
      fullPage: true,
    });
    
    // MCP automatically handles visual diffs
    await mcp.expectVisualMatch("dashboard-layout-baseline.png");
  });

  await teardownE2E();
});
```

## Test Data Management

### Advanced Test Data Builders

Build test data that mirrors real database constraints and relationships:

```typescript
// test/builders/user.builder.ts
import type { User, UserRole } from "@/types/database/index.ts";

export class UserBuilder {
  private user: Partial<User> = {
    id: `user_${Date.now()}`,
    email: "test@example.com",
    name: "Test User",
    role: "user",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  withId(id: string): UserBuilder {
    this.user.id = id;
    return this;
  }

  withEmail(email: string): UserBuilder {
    this.user.email = email;
    return this;
  }

  withName(name: string): UserBuilder {
    this.user.name = name;
    return this;
  }

  withRole(role: UserRole): UserBuilder {
    this.user.role = role;
    return this;
  }

  inactive(): UserBuilder {
    this.user.isActive = false;
    return this;
  }

  createdAt(date: Date): UserBuilder {
    this.user.createdAt = date;
    return this;
  }

  build(): User {
    if (!this.user.id || !this.user.email || !this.user.name) {
      throw new Error("User must have id, email, and name");
    }
    return this.user as User;
  }

  // Static factory methods for common patterns
  static admin(): UserBuilder {
    return new UserBuilder().withRole("admin");
  }

  static inactive(): UserBuilder {
    return new UserBuilder().inactive();
  }

  static withEmail(email: string): UserBuilder {
    return new UserBuilder().withEmail(email);
  }
}

// Usage in tests
Deno.test("User operations", async (t) => {
  await t.step("admin can delete users", async () => {
    const admin = UserBuilder.admin()
      .withEmail("admin@example.com")
      .build();
    
    const regularUser = UserBuilder.withEmail("user@example.com").build();
    
    const result = await deleteUser(admin, regularUser.id);
    assertEquals(result.success, true);
  });

  await t.step("inactive users cannot login", async () => {
    const inactiveUser = UserBuilder.inactive()
      .withEmail("inactive@example.com")
      .build();
    
    await assertRejects(
      () => authenticateUser(inactiveUser.email, "password"),
      Error,
      "Account is inactive"
    );
  });
});
```

### Database Test Helpers

```typescript
// test/helpers/database.ts
import postgres from "https://deno.land/x/postgresjs@v3.4.4/mod.js";
import type { User, Project } from "@/types/database/index.ts";

// Test database connection (separate from production)
const testSql = postgres(Deno.env.get("TEST_DATABASE_URL")!);

export const createTestUser = async (userData: Partial<User> = {}): Promise<User> => {
  const user = UserBuilder.withEmail(userData.email || "test@example.com")
    .withName(userData.name || "Test User")
    .build();

  const [createdUser] = await testSql<User[]>`
    INSERT INTO "users" (id, email, name, role, is_active)
    VALUES (${user.id}, ${user.email}, ${user.name}, ${user.role}, ${user.isActive})
    RETURNING *
  `;

  return createdUser;
};

export const createTestProject = async (
  ownerId: string,
  projectData: Partial<Project> = {}
): Promise<Project> => {
  const project = ProjectBuilder.withOwnerId(ownerId)
    .withName(projectData.name || "Test Project")
    .build();

  const [createdProject] = await testSql<Project[]>`
    INSERT INTO "projects" (id, owner_id, name, description)
    VALUES (${project.id}, ${project.ownerId}, ${project.name}, ${project.description})
    RETURNING *
  `;

  return createdProject;
};

export const cleanupTestData = async (): Promise<void> => {
  // Clean up in reverse dependency order
  await testSql`DELETE FROM "project_memberships"`;
  await testSql`DELETE FROM "projects"`;
  await testSql`DELETE FROM "users"`;
};

// Transactional test helper for isolation
export const withTestTransaction = async <T>(
  testFn: (sql: typeof testSql) => Promise<T>
): Promise<T> => {
  return await testSql.begin(async (transaction) => {
    try {
      const result = await testFn(transaction);
      // Transaction automatically rolls back after test
      throw new Error("ROLLBACK"); // Force rollback
    } catch (error) {
      if (error.message === "ROLLBACK") {
        return await testFn(transaction); // Re-run test with clean state
      }
      throw error;
    }
  });
};
```

### Test Organization and Naming

```typescript
// test/features/user-management.test.ts
import { assertEquals, assertRejects } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { UserBuilder } from "../builders/user.builder.ts";
import { createTestUser, cleanupTestData } from "../helpers/database.ts";

Deno.test("User Management", async (t) => {
  // Setup - run before each test step
  const setupTest = async () => {
    await cleanupTestData();
  };

  await t.step("User Registration", async (subT) => {
    await setupTest();

    await subT.step("should create user with valid data", async () => {
      const userData = {
        email: "newuser@example.com",
        name: "New User",
        password: "SecurePassword123!",
      };

      const user = await createUser(userData);

      assertEquals(user.email, userData.email);
      assertEquals(user.name, userData.name);
      assertEquals(user.isActive, true);
    });

    await subT.step("should reject duplicate email", async () => {
      const existingUser = await createTestUser({
        email: "existing@example.com",
      });

      await assertRejects(
        () => createUser({
          email: existingUser.email,
          name: "Another User",
          password: "password",
        }),
        Error,
        "Email already exists"
      );
    });

    await subT.step("should validate email format", async () => {
      await assertRejects(
        () => createUser({
          email: "invalid-email",
          name: "Test User",
          password: "password",
        }),
        Error,
        "Invalid email format"
      );
    });
  });

  await t.step("User Authentication", async (subT) => {
    await setupTest();

    await subT.step("should authenticate with correct credentials", async () => {
      const user = await createTestUser({
        email: "auth@example.com",
      });
      
      const session = await authenticateUser(user.email, "correct-password");

      assertEquals(session.userId, user.id);
      assertEquals(typeof session.token, "string");
    });

    await subT.step("should reject incorrect password", async () => {
      const user = await createTestUser({
        email: "auth@example.com",
      });

      await assertRejects(
        () => authenticateUser(user.email, "wrong-password"),
        Error,
        "Invalid credentials"
      );
    });
  });
});
```

## Test Performance and Optimization

### Parallel Test Execution Strategy

```typescript
// Configure Deno test for optimal performance
// Run with: deno test --allow-all --parallel --reporter=pretty

// Fast unit tests - run with high concurrency
Deno.test("Pure function tests", {
  permissions: { net: false, read: false, write: false },
  fn: async (t) => {
    // These can run in parallel safely
    await Promise.all([
      t.step("validateEmail formats", testEmailValidation),
      t.step("calculateDiscount rates", testDiscountCalculation),
      t.step("formatCurrency display", testCurrencyFormatting),
    ]);
  },
});

// Database tests - limited concurrency to avoid conflicts
Deno.test("Database operations", {
  permissions: { net: true, read: true, env: true },
  fn: async (t) => {
    // Run sequentially to avoid database conflicts
    await t.step("create user", testCreateUser);
    await t.step("update user", testUpdateUser);
    await t.step("delete user", testDeleteUser);
  },
});

// E2E tests - run sequentially due to browser/server dependencies
Deno.test("End-to-end workflows", {
  permissions: { net: true, read: true, write: true, run: true },
  fn: async (t) => {
    await t.step("user registration flow", testUserRegistration);
    await t.step("checkout process", testCheckoutProcess);
  },
});
```

### Test Data Performance

```typescript
// Efficient test data creation with bulk operations
export const createTestUsers = async (count: number): Promise<User[]> => {
  const users = Array.from({ length: count }, (_, i) => 
    UserBuilder.withEmail(`user${i}@example.com`)
      .withName(`User ${i}`)
      .build()
  );

  // Bulk insert instead of individual inserts
  const createdUsers = await testSql<User[]>`
    INSERT INTO "users" ${testSql(users, 'id', 'email', 'name', 'role', 'is_active')}
    RETURNING *
  `;

  return createdUsers;
};

// Use test data factories efficiently
Deno.test("Bulk operations performance", async (t) => {
  await t.step("should handle large user lists efficiently", async () => {
    const users = await createTestUsers(1000);
    
    const startTime = performance.now();
    const activeUsers = await getActiveUsers();
    const endTime = performance.now();

    assertEquals(activeUsers.length, users.length);
    // Performance assertion
    assertEquals(endTime - startTime < 100, true, "Query should complete in <100ms");
  });
});
```
