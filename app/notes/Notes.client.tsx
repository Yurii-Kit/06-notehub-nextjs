'use client';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import type { FetchNoteResponse } from '@/types/note';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './Notes.client.module.css';
import SearchBox from '@/components/SearchBox/SearchBox';

const NotesClient = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [query, setQuery] = useState<string>('');
  const debouncedSetQuery = useDebouncedCallback((newQuery: string) => {
    setQuery(newQuery);
    setCurrentPage(1);
  }, 800);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  // ✅ React Query підхоплює гідратований кеш
  const { data, isLoading, isError } = useQuery<FetchNoteResponse>({
    queryKey: ['notes', query, currentPage],
    queryFn: () => fetchNotes(query, currentPage),
  });

  if (isLoading) return <p>Loading notes...</p>;
  if (isError) return <p>Failed to load notes.</p>;

  // ✅ Безпечна перевірка: навіть якщо notes немає
  if (!data?.notes?.length) {
    return <p>No notes found</p>;
  }

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox text={query} onSearch={debouncedSetQuery} />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </div>
      <NoteList notes={data.notes} />
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default NotesClient;
