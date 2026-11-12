import { expect, test, type Browser, type Page } from '@playwright/test';

test.skip(
  !process.env.NEXT_PUBLIC_SUPABASE_URL,
  'Requires Supabase credentials in .env.local',
);

const signInAndOpenChat = async (page: Page, url: string) => {
  await page.goto(url);
  await page.getByRole('button', { name: 'Wejdź jako demo' }).click();
  await expect(page.getByRole('heading', { name: 'Marek' })).toBeVisible();
};

const openInvitedChat = async (browser: Browser) => {
  const host = await (await browser.newContext()).newPage();
  await signInAndOpenChat(host, '/chats/p01');
  await host
    .getByRole('button', { name: 'Zaproś na drugim urządzeniu' })
    .click();
  await expect(host).toHaveURL(/\?room=/);
  return host;
};

test('invited user chats with the host in a private room', async ({
  browser,
}) => {
  const host = await openInvitedChat(browser);
  const stranger = await openInvitedChat(browser);

  const guest = await (await browser.newContext()).newPage();
  await signInAndOpenChat(guest, host.url());

  // Broadcast is not buffered, so retry until the peer's channel has joined.
  let attempt = 0;
  let message = '';
  await expect(async () => {
    message = `Cześć z telefonu A #${++attempt}`;
    await host.getByLabel('Napisz wiadomość').fill(message);
    await host.getByRole('button', { name: 'Wyślij' }).click();
    await expect(guest.getByText(message)).toBeVisible({ timeout: 2000 });
  }).toPass({ timeout: 20_000 });

  await expect(stranger.getByText(message)).toHaveCount(0);
});
