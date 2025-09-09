import css from './Home.module.css';
export const metadata = {
  title: 'Сторінку не знайдено — Note-Hub',
  description: 'На жаль, такої сторінки не існує.',
  openGraph: {
    title: '404 — Note-Hub',
    description: 'Сторінка не знайдена',
    url: 'https://notehub.vercel.app/not-found',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

const notFound = () => {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
};

export default notFound;
