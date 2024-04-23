import { useState } from 'react';
import Node, { NodeType } from './Node';
import NoData from './NoData';
import { Props as FetchProps } from '../../modules/Tree/index';
import styles from './styles.module.scss';

type Props = {
  data: NodeType[];
  onLoadData: (id: string) => Promise<FetchProps>;
};

const Tree = ({ data, onLoadData }: Props) => {
  const [widthElems, setWidthElems] = useState<number[]>([]);
  if (!data.length) {
    return <NoData />;
  }

  const resizeWidth = (widthElem: number) => {
    setWidthElems((oldValues) => [...oldValues, widthElem]);
  };

  return (
    <ul className={styles.tree}>
      {data.map((node) => (
        <Node
          data={node}
          key={node.id}
          onLoadData={onLoadData}
          resize={resizeWidth}
          widthElems={widthElems}
        />
      ))}
    </ul>
  );
};

export default Tree;
