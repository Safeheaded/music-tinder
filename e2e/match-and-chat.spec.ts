import { expect, test } from '@playwright/test';

test('swipe, match and chat with the bot', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Polub' }).click();
  await expect(page.getByRole('dialog')).toContainText('To match!');

  await page.getByRole('link', { name: 'Napisz wiadomość' }).click();
  await expect(page.getByRole('heading', { name: 'Marek' })).toBeVisible();

  await page.getByLabel('Napisz wiadomość').fill('Cześć Marek!');
  await page.getByRole('button', { name: 'Wyślij' }).click();

  await expect(page.getByText('Cześć Marek!')).toBeVisible();
  await expect(page.getByText(/Od jak dawna grasz/)).toBeVisible();
});
