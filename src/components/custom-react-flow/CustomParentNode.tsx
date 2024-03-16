import { Handle, Position } from "reactflow";
import FamMemberCard from "../FamMemberCard/FamMemberCard";
import { type Prisma } from "@prisma/client";

interface CustomParentNodeProps {
  data: {
    label: string;
    memberA: Prisma.FamMembersGetPayload<null>;
    memberB?: Prisma.FamMembersGetPayload<null>;
  };
  isConnectable: boolean;
}

function CustomParentNode({ data, isConnectable }: CustomParentNodeProps) {
  return (
    <div className="text-updater-node p-2">
      <div className="py-2s rounded border-transparent px-4">
        <label htmlFor="text" className="flex">
          <span className="mr-2">
            <FamMemberCard
              MemberType="PARENT"
              MemberData={data.memberA}
              showArrow={false}
            />
          </span>
          {data.memberB && (
            <FamMemberCard
              MemberType="PARENT"
              MemberData={data.memberB}
              showArrow={false}
            />
          )}
        </label>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        id="b"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default CustomParentNode;
