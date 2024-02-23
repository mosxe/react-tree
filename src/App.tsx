import { useState } from "react";
import Tree from "./components/Tree";

const DATA = [
  {
    id: 1,
    parent_id: null,
    title: "Заголовок 1",
    is_has_children: false,
    children: [],
  },
  {
    id: 2,
    parent_id: null,
    title: "Заголовок 2",
    is_has_children: true,
    children: [
      // {
      //   id: 4,
      //   parent_id: 2,
      //   title: "Заголовок 2-2",
      //   is_children: false,
      //   children: [],
      // },
    ],
  },
  {
    id: 3,
    parent_id: null,
    title: "Заголовок 3",
    is_has_children: false,
    children: [],
  },
];

function App() {
  return (
    <>
      <Tree data={DATA} />
    </>
  );
}

export default App;
