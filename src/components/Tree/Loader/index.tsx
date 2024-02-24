import styles from './styles.module.scss';

const Loader = () => {
  return (
    <div className={styles.spinner}>
      <span className={styles.spinner__curcle}></span>
    </div>
  );
};

export default Loader;
