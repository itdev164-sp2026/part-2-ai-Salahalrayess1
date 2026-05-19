import { expect, test } from "@playwright/test"

const testUserEmail = process.env.TEST_USER_EMAIL
const testUserPassword = process.env.TEST_USER_PASSWORD
const hasTestCredentials = Boolean(testUserEmail && testUserPassword)

test.describe("Authentication flow", () => {
  test("Login page is visible with email, password, and submit controls", async ({ page }) => {
    await page.goto("/login")
    await expect(page.getByLabel("Email")).toBeVisible()
    await expect(page.getByLabel("Password")).toBeVisible()
    await expect(page.getByRole("button", { name: "Sign in", exact: true })).toBeVisible()
  })

  test("Successful login redirects to the projects dashboard", async ({ page }) => {
    test.skip(
      !hasTestCredentials,
      "Set TEST_USER_EMAIL and TEST_USER_PASSWORD to run the login redirect test."
    )
    await page.goto("/login")
    await page.getByLabel("Email").fill(testUserEmail ?? "")
    await page.getByLabel("Password").fill(testUserPassword ?? "")
    await Promise.all([
      page.waitForURL(/\/projects\/?$/),
      page.getByRole("button", { name: "Sign in", exact: true }).click(),
    ])
    await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible()
  })

  test("Signed-in users can see sidebar navigation links", async ({ page }) => {
    test.skip(
      !hasTestCredentials,
      "Set TEST_USER_EMAIL and TEST_USER_PASSWORD to run the sidebar navigation test."
    )
    await page.goto("/login")
    await page.getByLabel("Email").fill(testUserEmail ?? "")
    await page.getByLabel("Password").fill(testUserPassword ?? "")
    await Promise.all([
      page.waitForURL(/\/projects\/?$/),
      page.getByRole("button", { name: "Sign in", exact: true }).click(),
    ])
    await expect(page.getByText("Overview").first()).toBeVisible()
    await expect(page.getByText("Projects").first()).toBeVisible()
    await expect(page.getByText("Settings").first()).toBeVisible()
  })
})
