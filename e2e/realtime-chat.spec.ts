import { expect, test, type Browser } from '@playwright/test';

test.skip(
  !process.env.NEXT_PUBLIC_SUPABASE_URL,
  'Requires Supabase credentials in .env.local',
);

const openChat = async (browser: Browser) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('/');
  await page.getByRole('button', { name: 'Wejdź jako demo' }).click();
  await page.goto('/chats/p01');
  await expect(page.getByRole('heading', { name: 'Marek' })).toBeVisible();
  return page;
};

test('two separate users chat in real time through Supabase', async ({
  browser,
}) => {
  const alice = await openChat(browser);
  const bob = await openChat(browser);

  // Broadcast is not buffered, so retry until the peer's channel has joined.
  let attempt = 0;
  await expect(async () => {
    const message = `Cześć z telefonu A #${++attempt}`;
    await alice.getByLabel('Napisz wiadomość').fill(message);
    await alice.getByRole('button', { name: 'Wyślij' }).click();
    await expect(bob.getByText(message)).toBeVisible({ timeout: 2000 });
  }).toPass({ timeout: 20_000 });
});
