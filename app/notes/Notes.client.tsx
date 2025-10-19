'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import type { FetchNoteResponse } from '@/types/note';
import NoteList from '@/components/NoteList/NoteList';

const NotesClient = () => {
  // ✅ React Query підхоплює гідратований кеш
  const { data, isLoading, isError } = useQuery<FetchNoteResponse>({
    queryKey: ['notes', '', 1],
    queryFn: () => fetchNotes(),
  });

  if (isLoading) return <p>Loading notes...</p>;
  if (isError) return <p>Failed to load notes.</p>;

  // ✅ Безпечна перевірка: навіть якщо notes немає
  if (!data?.notes?.length) {
    return <p>No notes found</p>;
  }

  return <NoteList notes={data.notes} />;
};

export default NotesClient;
