import { test, expect } from "@playwright/test"

const testUserEmail = process.env.TEST_USER_EMAIL
const testUserPassword = process.env.TEST_USER_PASSWORD

const hasTestCredentials = Boolean(testUserEmail && testUserPassword)

test.describe("Authentication flow", () => {
  test("Login page visible", async ({ page }) => {
    await page.goto("http://localhost:3000/login")

    // Verify the form structure exists with role-based locators
    const emailInput = page.locator('input[id="email"]')
    const passwordInput = page.locator('input[id="password"]')
    const signInButton = page.locator('button[type="submit"]')

    await expect(emailInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(signInButton).toBeVisible()

    // Verify the card title text is visible
    await expect(page.getByText(/sign in to your account/i)).toBeVisible()
  })

  test("Redirects to Projects after successful login", async ({ page }) => {
    test.skip(!hasTestCredentials, "TEST_USER_EMAIL and TEST_USER_PASSWORD are not set")

    await page.goto("http://localhost:3000/login")

    // Fill in credentials
    await page.locator('input[id="email"]').fill(testUserEmail!)
    await page.locator('input[id="password"]').fill(testUserPassword!)

    // Click sign in and wait for navigation
    await Promise.all([
      page.waitForURL("http://localhost:3000/projects"),
      page.locator('button[type="submit"]').click(),
    ])

    // Verify we're on the projects page
    await expect(page.getByRole("heading", { name: /my projects/i })).toBeVisible()
  })

  test("Shows sidebar navigation links after login", async ({ page }) => {
    test.skip(!hasTestCredentials, "TEST_USER_EMAIL and TEST_USER_PASSWORD are not set")

    await page.goto("http://localhost:3000/login")

    // Fill in credentials and submit
    await page.locator('input[id="email"]').fill(testUserEmail!)
    await page.locator('input[id="password"]').fill(testUserPassword!)

    await Promise.all([
      page.waitForURL("http://localhost:3000/projects"),
      page.locator('button[type="submit"]').click(),
    ])

    // Verify sidebar navigation is visible with role-based locators
    await expect(page.getByRole("link", { name: /overview/i })).toBeVisible()
    await expect(page.getByRole("link", { name: /projects/i })).toBeVisible()
    await expect(page.getByRole("link", { name: /settings/i })).toBeVisible()
  })
})
