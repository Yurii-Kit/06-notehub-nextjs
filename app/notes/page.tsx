// import Modal from '@/components/Modal/Modal';
// import NoteList from '@/components/NoteList/NoteList';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from '@/app/notes/Notes.client';
// import NoteForm from '@/components/NoteForm/NoteForm';
// import SearchBox from '@/components/SearchBox/SearchBox';
// import Pagination from '@/components/Pagination/Pagination';
// import Loader from '@/components/Loader/Loader';
// import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import { fetchNotes } from '@/lib/api';
// import type { FetchNoteResponse } from '../../types/note';
import css from './page.module.css';

const Notes = async () => {
  // ✅ 1. Ініціалізуємо QueryClient на сервері
  const queryClient = new QueryClient();

  // ✅ 2. Попередньо завантажуємо дані (prefetch)
  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1], // можна передати параметри запиту
    queryFn: () => fetchNotes(),
  });

  // ✅ 3. Готуємо гідратований стан для передачі в клієнт
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={css.app}>
      {/* <div className={css.toolbar}>
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
      </div> */}

      {/* {isLoading && <Loader />}
      {isError && <ErrorMessage error={error} />}
      

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )} */}

      <section>
        {/* // ✅ 4. Обгортаємо клієнтський компонент у HydrationBoundary */}
        <HydrationBoundary state={dehydratedState}>
          <NotesClient />
        </HydrationBoundary>
      </section>
    </div>
  );
};
export default Notes;
