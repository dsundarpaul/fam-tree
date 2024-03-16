import React from "react";
import ReactFlow, {
  Background,
  MiniMap,
  useEdgesState,
  BackgroundVariant,
  type Node,
  type Edge,
} from "reactflow";
import { api } from "~/utils/api";

import "reactflow/dist/style.css";
import CustomParentNode from "~/components/custom-react-flow/CustomParentNode";
import { LoadingState } from "~/components/loading-state/LoadingState";

// INFO: IN ANY PERFORMANCE ISSUE MEMOIZE THIS DECLEARTION
const nodeTypes = { parentNode: CustomParentNode };

const RenderTree = (data: { nodes: Node[]; edges: Edge[] }) => {
  console.log({ data });

  const [edges, setEdges, onEdgesChange] = useEdgesState(data.edges);

  return (
    <div>
      {" "}
      <div
        className=" rounded-md border-[1px] border-slate-500 text-black"
        style={{ width: "100%", height: "100vh" }}
      >
        <ReactFlow
          nodes={data?.nodes}
          edges={edges}
          // draggable={false}
          // panOnDrag={false}
          // zoomOnScroll={false}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
        >
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
};

const TreeView = () => {
  const { data, isLoading } = api.famMember.getFullTree.useQuery(null);

  if (isLoading) {
    return <LoadingState />;
  }

  if (data !== undefined) {
    return <RenderTree nodes={data.nodes} edges={data.edges} />;
  }
};

export default TreeView;
