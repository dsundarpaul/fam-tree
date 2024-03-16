import { type Prisma } from "@prisma/client";
import * as dagre from "dagre";
import { type Node, type Edge } from "reactflow";

interface getTreeNodeProps {
  records: Prisma.FamMembersGetPayload<null>[];
}

// interface TreeNodeType extends Node {
//   id: string;
//   position: { x: number; y: number };
//   data: {
//     label: string;
//     memberA: Prisma.FamMembersGetPayload<null>;
//     memberB?: Prisma.FamMembersGetPayload<null>;
//   };
//   type: string;
// }

export function getTreeNodes({ records }: getTreeNodeProps) {
  const position = { x: 0, y: 0 };

  const nodes: Node[] = [];

  records.forEach((record) => {
    const { FMfamId, ...data } = record;

    const existingNode = nodes.find((node) => node.id === FMfamId);

    if (!existingNode) {
      const newNode = {
        id: FMfamId,
        position,
        data: {
          label: "test",
          memberA: data,
          // memberB: {},
        },
        type: "parentNode",
      };
      nodes.push(newNode);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      existingNode.data.memberB = data;
    }
  });

  const edges = createEdges(records, nodes);

  const { initialNodes: layoutedNodes, initialEdges: layoutedEdges } =
    getLayoutedElements(nodes, edges);

  return { nodes: layoutedNodes, edges: layoutedEdges };
}

const getLayoutedElements = (initialNodes: Node[], initialEdges: Edge[]) => {
  const dagreGraph: dagre.graphlib.Graph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 450;
  const nodeHeight = 250;

  console.log("getting layerted elemetns");
  dagreGraph.setGraph({ rankdir: "TB" });

  initialNodes.forEach((node) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (node.data.memberB) {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    } else {
      dagreGraph.setNode(node.id, { width: nodeWidth / 2, height: nodeHeight });
    }
  });

  initialEdges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  initialNodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { initialNodes, initialEdges };
};

function createEdges(
  records: Prisma.FamMembersGetPayload<null>[],
  nodes: Node[],
): Edge[] {
  const edges: Edge[] = [];

  // Iterate through each record
  nodes.forEach((node) => {
    let edge: Edge;

    records.map((r) => {
      if (r.FMparentId === node.id) {
        // Create edge object
        edge = {
          id: `${node.id}-${r.FMparentId}`,
          type: "custom-edge",
          source: node.id,
          target: r.FMfamId,
        };

        // Add edge to edges array
        edges.push(edge);
      }
    });
  });

  return edges;
}
