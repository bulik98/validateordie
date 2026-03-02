const { test, expect } = require('@playwright/test');

test.describe('Visual Regression Tests', () => {
  test('should render hero section correctly on desktop', async ({ page }) => {
    await page.goto('/');

    // Wait for fonts to load
    await page.waitForLoadState('networkidle');

    const heroSection = page.locator('.hero-section');
    await expect(heroSection).toBeVisible();

    // Check hero title is large and visible
    const heroTitle = page.locator('.hero-title');
    await expect(heroTitle).toBeVisible();

    const titleBox = await heroTitle.boundingBox();
    expect(titleBox.height).toBeGreaterThan(200); // Should be substantial size
  });

  test('should render hero section correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone size
    await page.goto('/');

    await page.waitForLoadState('networkidle');

    const heroTitle = page.locator('.hero-title');
    await expect(heroTitle).toBeVisible();

    // Mobile hero should still be prominent
    const titleBox = await heroTitle.boundingBox();
    expect(titleBox.height).toBeGreaterThan(150);

    // Check mobile navigation is hidden
    await expect(page.locator('.nav-menu')).not.toBeVisible();
  });

  test('should maintain layout integrity on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad size
    await page.goto('/');

    await page.waitForLoadState('networkidle');

    // Check key sections are visible
    await expect(page.locator('.hero-section')).toBeVisible();
    await expect(page.locator('.problem-section')).toBeVisible();
    await expect(page.locator('.pricing-section')).toBeVisible();
  });

  test('should display pricing cards correctly across viewports', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667 },  // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1920, height: 1080 } // Desktop
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/#pricing');

      await page.waitForLoadState('networkidle');

      // All pricing cards should be visible
      const pricingCards = page.locator('.pricing-card');
      const count = await pricingCards.count();
      expect(count).toBe(3);

      // Each card should be properly sized
      for (let i = 0; i < count; i++) {
        const card = pricingCards.nth(i);
        await expect(card).toBeVisible();

        const cardBox = await card.boundingBox();
        expect(cardBox.width).toBeGreaterThan(200);
        expect(cardBox.height).toBeGreaterThan(300);
      }
    }
  });

  test('should display form correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/#application-form');

    await page.waitForLoadState('networkidle');

    // Form should be visible and properly sized
    const form = page.locator('#validationForm');
    await expect(form).toBeVisible();

    // Form inputs should be accessible
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#idea')).toBeVisible();

    // Submit button should be properly sized
    const submitBtn = page.locator('.btn-form-submit');
    await expect(submitBtn).toBeVisible();

    const btnBox = await submitBtn.boundingBox();
    expect(btnBox.width).toBeGreaterThan(200); // Should be tap-friendly
  });

  test('should handle very large screens', async ({ page }) => {
    await page.setViewportSize({ width: 2560, height: 1440 }); // 4K
    await page.goto('/');

    await page.waitForLoadState('networkidle');

    // Content should be centered and not stretched too wide
    const container = page.locator('.container').first();
    const containerBox = await container.boundingBox();

    // Should have reasonable max width
    expect(containerBox.width).toBeLessThan(1400);

    // Hero title should not be too large
    const heroTitle = page.locator('.hero-title');
    const titleBox = await heroTitle.boundingBox();
    expect(titleBox.height).toBeLessThan(600);
  });

  test('should maintain readability at minimum supported width', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 }); // iPhone 5
    await page.goto('/');

    await page.waitForLoadState('networkidle');

    // Text should still be readable
    const heroTitle = page.locator('.hero-title');
    await expect(heroTitle).toBeVisible();

    // Font size should be reasonable
    const fontSize = await heroTitle.evaluate(el => {
      return window.getComputedStyle(el).fontSize;
    });

    const fontSizeNum = parseFloat(fontSize);
    expect(fontSizeNum).toBeGreaterThan(24); // At least 24px
  });

  test('should show legal warning section properly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const warningSection = page.locator('text=STOP WASTING MONEY ON LEGAL BULLSHIT');
    await expect(warningSection).toBeVisible();

    // Should have red styling
    const color = await warningSection.evaluate(el => {
      return window.getComputedStyle(el).color;
    });

    // Should be red or white (for visibility)
    expect(color).toMatch(/(rgb\(255, 255, 255\)|rgb\(255, 0, 0\))/);
  });
});