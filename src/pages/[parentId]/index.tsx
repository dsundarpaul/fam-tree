"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import AddMemberCard from "~/components/AddMemberCard/AddMemberCard";
import FamMemberCard from "~/components/FamMemberCard/FamMemberCard";
import { LoadingState } from "~/components/loading-state/LoadingState";
import { type famMemberType } from "~/types";
import { api } from "~/utils/api";
import { FamMember } from "~/constants/consts";

function AddFamily() {
  const router = useRouter();

  const parentId =
    router?.query.parentId === "parentId"
      ? "AAA"
      : (router?.query.parentId as string);

  console.log(router.query);

  const { data, isLoading } = api.famMember.getFamById.useQuery(
    router && router?.query.parentId === "parentId"
      ? "AAA"
      : (router?.query.parentId as string),
  );

  console.log({ data });

  const renderParents = () => (
    <div className="flex w-full items-center justify-evenly">
      {data?.parents.map((member) => (
        <FamMemberCard
          memberName={member.FMname}
          data={member}
          img={null}
          key={member.id}
        />
      ))}

      {data && data?.parents?.length < 2 && (
        <AddMemberCard
          famId={parentId}
          parentId={parentId}
          FMType={FamMember.PARENT}
        />
      )}
    </div>
  );

  const renderChildren = () => (
    <div className="children mt-20 flex w-full flex-wrap items-center justify-around ">
      {data?.children && (
        <>
          {data?.children?.map((child, idx: number) => {
            return (
              <div
                key={idx}
                // onClick={() => hanldeOnClickNavigation(child.navigateTo)}
              >
                {child && (
                  <FamMemberCard
                    memberName={child.FMname}
                    img={null}
                    data={data}
                  />
                )}
              </div>
            );
          })}
        </>
      )}
      <AddMemberCard
        famId={parentId}
        parentId={parentId}
        FMType={FamMember.CHILD}
      />
    </div>
  );

  return (
    <div>
      {isLoading ? (
        <LoadingState />
      ) : (
        <>
          {renderParents()}
          {data?.parents && renderChildren()}
        </>
      )}
    </div>
  );
}

export default AddFamily;
