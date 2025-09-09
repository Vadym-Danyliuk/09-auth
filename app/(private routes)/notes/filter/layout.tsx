import css from './LayoutNotes.module.css';

interface LayoutNotesProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

const LayoutNotes = ({ children, sidebar }: LayoutNotesProps) => {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </div>
  );
};

export default LayoutNotes;
