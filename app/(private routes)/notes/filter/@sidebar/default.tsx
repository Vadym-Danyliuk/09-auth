import Link from 'next/link';
import css from './SidebarNotes.module.css';

const tagList: string[] = [
  'All notes',
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

const SidebarNotes = () => {
  return (
    <ul className={css.menuList}>
      {tagList.map(item => (
        <li className={css.menuItem} key={item}>
          <Link href={`/notes/filter/${item}`} className={css.menuLink}>
            {item}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;
