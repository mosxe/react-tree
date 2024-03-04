import Node, { NodeType } from './Node';
import NoData from './NoData';
import {Props as FetchProps} from '../../modules/Tree/index';
import styles from './styles.module.scss';

type Props = {
  data: NodeType[];
  onLoadData: (id: string) => Promise<FetchProps>;
};

const Tree = ({ data, onLoadData }: Props) => {
  if (!data.length) {
    return <NoData />;
  }

  return (
    <ul className={styles.tree}>
      {data.map((node) => (
        <Node data={node} key={node.id} onLoadData={onLoadData} />
      ))}
    </ul>
  );
};

export default Tree;
