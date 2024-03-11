﻿import styles from './styles.module.scss';

const defaultMessage =
  'Произошла ошибка! Просьба обратиться в техническу поддержку портала.';

const Error = ({ message }: { message?: string }) => {
  return (
    <div className={styles['error-boundry']}>
      <div className={styles['error-boundry__wrapper']}>
        <svg
          aria-hidden='true'
          className='w-6 h-6 course-text-red-500 dark:course-text-red-600'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
          />
        </svg>
        <div className={styles['error-boundry__text']}>
          {message || defaultMessage}
        </div>
      </div>
    </div>
  );
};

export default Error;
