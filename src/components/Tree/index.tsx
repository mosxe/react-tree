import Node, { NodeType } from './Node';
import styles from './styles.module.scss';

type Props = {
  data: NodeType[];
  onLoadData: (id: string) => Promise<any>;
};

const Tree = ({ data, onLoadData }: Props) => {
  return (
    <ul className={styles.tree}>
      {data.map((node) => (
        <Node data={node} key={node.id} onLoadData={onLoadData} />
      ))}
    </ul>
  );
};

export default Tree;
