import Node, { NodeType } from "./Node";

type Props = {
  data: NodeType[];
};

const Tree = ({ data }: Props) => {
  console.log(data);
  return (
    <ul>
      {data.map((node) => (
        <Node data={node} key={node.id} />
      ))}
    </ul>
  );
};

export default Tree;
