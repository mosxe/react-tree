import { useState } from 'react';
import Loader from '../Loader';
import styles from './styles.module.scss';
import stylesTree from '../styles.module.scss';

export type NodeType = {
  id: string;
  title: string;
  is_has_children: boolean;
  is_sub: boolean;
  person?: {
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
  onLoadData: (params: any) => Promise<any>;
};

const Node = ({ data, onLoadData }: Props) => {
  const [nodeData, setNodeData] = useState<NodeType[]>([]);
  const [isShowChildren, setShowChildren] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    if (data.is_has_children && !nodeData.length) {
      setLoading(true);
      const dataChild = await onLoadData(data.id);
      setNodeData(dataChild);
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
          width='36px'
          height='36px'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z'
            fill='#0F0F0F'
          />
        </svg>
      </button>
    );
  };

  const content = () => {
    if (data.is_sub) {
      const classNameTitle = !data.is_has_children
        ? `${styles.treenode__title} ${styles['treenode-ml']}`
        : styles.treenode__title;
      return <div className={`${classNameTitle}`}>{data.title}</div>;
    }

    const classNameContent = !data.is_has_children
      ? `${styles.treenode__content} ${styles['treenode-ml']}`
      : styles.treenode__content;

    const markColor = data.person?.mark_color;

    return (
      <div className={classNameContent}>
        <div
          className={styles.treenode__mark}
          style={{ backgroundColor: markColor }}
        >
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

  if (!data.is_has_children) {
    return (
      <li className={`${styles.treenode} ${styles['treenode-mb']}`}>
        {content()}
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
            <Node data={node} key={node.id} onLoadData={onLoadData} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default Node;
