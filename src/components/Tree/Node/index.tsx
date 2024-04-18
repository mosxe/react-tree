import { useState } from 'react';
import Loader from '../Loader';
import { Props as FetchProps } from '../../../modules/Tree/index';
import styles from './styles.module.scss';
import stylesTree from '../styles.module.scss';

export type NodeType = {
  id: string;
  avatar: string;
  fullname: string;
  position: string;
  subdivision: string;
  mark: string;
  mark_color: string;
  is_has_children: boolean;
};

type Props = {
  data: NodeType;
  onLoadData: (id: string) => Promise<FetchProps>;
};

const Node = ({ data, onLoadData }: Props) => {
  const [nodeData, setNodeData] = useState<NodeType[]>([]);
  const [isShowChildren, setShowChildren] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);

  const handleClick = async () => {
    if (data.is_has_children && !nodeData.length) {
      setLoading(true);
      const payload = await onLoadData(data.id);
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

  const handleLink = (personIdParam: string) => {
    window.open(`/assessment_person/${personIdParam}`);
  };

  const icon = () => {
    if (isLoading) {
      return (
        <div className={styles['treenode__loader']}>
          <Loader />
        </div>
      );
    }

    return (
      <div
        className={`${styles['treenode__circle']} ${
          isShowChildren
            ? styles['treenode__circle_opened']
            : styles['treenode__circle_closed']
        }`}
        onClick={() => handleClick()}
      >
        <div className={styles['treenode__circle_horizontal']}></div>
        <div className={styles['treenode__circle_vertical']}></div>
      </div>
    );
  };

  const content = () => {
    const markColor = data.mark_color;
    const personIdParam = data.id || '';
    return (
      <div
        className={styles.treenode__content}
        onClick={() => handleLink(personIdParam)}
      >
        <div className={styles.treenode__avatar}>
          <img src={data.avatar} alt='Фото' />
        </div>
        <div className={styles.treenode__desc}>
          <span className={styles.treenode__name}>
            <strong>{data.fullname}</strong>
          </span>
          <span className={styles.treenode__subname}>{data.position}</span>
          <span className={styles.treenode__subname}>{data.subdivision}</span>
        </div>
        <div
          className={styles.treenode__mark}
          style={{ backgroundColor: markColor }}
        >
          <span>{data.mark}</span>
        </div>
      </div>
    );
  };

  const isShowLine = isShowChildren || data.is_has_children;

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
      {isShowLine && <div className={styles.treenode__line}></div>}
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
            <Node data={node} key={node.id} onLoadData={onLoadData} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default Node;
