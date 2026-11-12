import { Suspense } from 'react';
import { ChatView } from '@/features/chat';
import { getProfiles } from '@/features/discover';

export const generateStaticParams = () =>
  getProfiles().map(({ id }) => ({ id }));

export default async function ChatPage({ params }: PageProps<'/chats/[id]'>) {
  const { id } = await params;
  return (
    <Suspense>
      <ChatView profileId={id} />
    </Suspense>
  );
}
