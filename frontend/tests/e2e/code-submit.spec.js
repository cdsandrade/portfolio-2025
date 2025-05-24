import { test, expect } from '@playwright/test'

const port = process.env.VITE_PORT || 4173

test('submits form and gets response', async ({ page }) => {
  // page.on('console', msg => console.log('BROWSER LOG:', msg.text()))

  await page.goto(`http://localhost:${port}`)
  await page.fill('input', '2+2')
  await page.click('button[type="submit"]')
  await expect(page.locator('pre').first()).toContainText('"result": 4')
  await expect(page.locator('pre').nth(1)).toContainText('4')
})
