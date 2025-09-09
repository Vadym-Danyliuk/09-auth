import css from '@/components/Loader/Loader.module.css';
export default function Loader() {
  return (
    <div className={css.loaderContainer}>
      <div className={css.spinner}></div>
      <p className={css.loadingText}>Loading...</p>
    </div>
  );
}