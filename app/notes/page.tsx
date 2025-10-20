import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from '@/app/notes/Notes.client';

import { fetchNotes } from '@/lib/api';

const Notes = async () => {
  // ✅ 1. Ініціалізуємо QueryClient на сервері
  const queryClient = new QueryClient();

  // ✅ 2. Попередньо завантажуємо дані (prefetch)
  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1], // можна передати параметри запиту
    queryFn: () => fetchNotes('', 1),
  });

  // ✅ 3. Готуємо гідратований стан для передачі в клієнт
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient />
    </HydrationBoundary>
  );
};
export default Notes;
