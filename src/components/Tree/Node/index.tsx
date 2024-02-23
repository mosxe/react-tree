import ArrowImage from "../../../assests/arrow.svg";
import Tree from "../index";

export type NodeType = {
  id: string;
  parent_id: null | string;
  title: string;
  is_has_children: boolean;
  children: NodeType[];
};

const Node = ({ data }: { data: NodeType }) => {
  return (
    <div>
      <img src={ArrowImage} alt="Стрелка" width={30} height={30} />
      <div>{data.title}</div>
      {data.is_has_children && <Tree data={data.children} />}
    </div>
  );
};

export default Node;
