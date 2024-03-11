import { useState } from 'react';
import Loader from '../Loader';
import { Props as FetchProps } from '../../../modules/Tree/index';
import styles from './styles.module.scss';
import stylesTree from '../styles.module.scss';

export type NodeType = {
  id: string;
  title: string;
  is_has_children: boolean;
  is_sub: boolean;
  person?: {
    id: string;
    avatar: string;
    fullname: string;
    position: string;
    mark: string;
    mark_color: string;
  };
  children: NodeType[];
};

type Props = {
  data: NodeType;
  personId?: string;
  onLoadData: (
    id: string,
    isSub: string,
    personId?: string
  ) => Promise<FetchProps>;
};

const Node = ({ data, personId, onLoadData }: Props) => {
  const [nodeData, setNodeData] = useState<NodeType[]>([]);
  const [isShowChildren, setShowChildren] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);

  const handleClick = async () => {
    if (data.is_has_children && !nodeData.length) {
      setLoading(true);
      const paramPersonId = personId
        ? personId
        : data?.person?.id
        ? data.person.id
        : '';
      const payload = await onLoadData(
        data.id,
        String(data.is_sub),
        paramPersonId
      );
      if (payload.isError) {
        setError(true);
      }
      setNodeData(payload.data);
      setLoading(false);
      setShowChildren(!isShowChildren);
    } else {
      setShowChildren(!isShowChildren);
    }
  };

  const icon = () => {
    if (isLoading) {
      return (
        <div className={styles['treenode__button-loader']}>
          <Loader />
        </div>
      );
    }

    return (
      <button
        className={
          isShowChildren
            ? `${styles.treenode__button} ${styles.treenode__button_active}`
            : styles.treenode__button
        }
        type='button'
        onClick={() => handleClick()}
      >
        <svg
          width='24px'
          height='24px'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z'
            fill='#0F0F0F'
          />
        </svg>
      </button>
    );
  };

  const content = () => {
    if (data.is_sub) {
      return <div className={styles.treenode__title}>{data.title}</div>;
    }

    const markColor = data.person?.mark_color;

    const classNameMark =
      data.person?.mark != ''
        ? styles.treenode__mark
        : `${styles.treenode__mark} ${styles['treenode__mark-hide']}`;

    return (
      <div className={styles.treenode__content}>
        <div className={classNameMark} style={{ backgroundColor: markColor }}>
          <span>{data.person?.mark}</span>
        </div>
        <div className={styles.treenode__avatar}>
          <img src={data.person?.avatar} alt='Фото' />
        </div>
        <div className={styles.treenode__desc}>
          <span className={styles.treenode__name}>
            <strong>{data.person?.fullname}</strong>
          </span>
          <span className={styles.treenode__subname}>
            {data.person?.position}
          </span>
        </div>
      </div>
    );
  };

  if (isError) {
    return (
      <li className={styles.treenode}>
        <div className={styles.treenode__wrapper}>
          <div className={styles.treenode__noop} aria-hidden={true}></div>
          <div
            className={`${styles.treenode__title} ${styles.treenode__title_error}`}
          >
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
            Произошла ошибка! Обратитесь в техническу поддержку портала.
          </div>
        </div>
      </li>
    );
  }

  if (!data.is_has_children) {
    return (
      <li className={styles.treenode}>
        <div className={styles.treenode__wrapper}>
          <div className={styles.treenode__noop} aria-hidden={true}></div>
          {content()}
        </div>
      </li>
    );
  }

  return (
    <li className={styles.treenode}>
      <div className={styles.treenode__wrapper}>
        {icon()}
        {content()}
      </div>
      {data.is_has_children && (
        <ul
          className={stylesTree.tree}
          style={{ display: isShowChildren ? 'block' : 'none' }}
        >
          {nodeData.map((node) => (
            <Node
              data={node}
              personId={data.person?.id}
              key={node.id}
              onLoadData={onLoadData}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default Node;
