"use client";

import { useRouter } from "next/router";
import AddMemberCard from "~/components/AddMemberCard/AddMemberCard";
import FamMemberCard from "~/components/FamMemberCard/FamMemberCard";
import { LoadingState } from "~/components/loading-state/LoadingState";
import { api } from "~/utils/api";
import { FamMember } from "~/constants/consts";
import { Toaster } from "react-hot-toast";

function AddFamily() {
  const router = useRouter();

  const famId =
    router?.query.famId === "famId" ? "AAA" : (router?.query.famId as string);

  console.log(router.query);

  const { data, isLoading } = api.famMember.getFamById.useQuery(
    router && router?.query.famId === "famId"
      ? "AAA"
      : (router?.query.famId as string),
  );

  console.log({ data });

  const renderParents = () => (
    <div className="flex w-full items-center justify-evenly">
      {data?.parents.map((member) => (
        <FamMemberCard
          MemberData={member}
          MemberType={FamMember.PARENT}
          hasChildren={data.children.length > 0}
          key={member.id}
        />
      ))}

      {data && data?.parents?.length < 2 && (
        <AddMemberCard famId={famId} FMType={FamMember.PARENT} />
      )}
    </div>
  );

  const renderChildren = () => {
    if (
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      (data?.children && data.children.length > 0) ||
      (data?.parents && data?.parents.length > 0)
    ) {
      return (
        <div className="children mt-20 flex w-full flex-wrap items-center justify-around space-x-2 ">
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
                        MemberData={child}
                        MemberType={FamMember.CHILD}
                      />
                    )}
                  </div>
                );
              })}
            </>
          )}
          <AddMemberCard famId={famId} FMType={FamMember.CHILD} />
        </div>
      );
    }
  };

  return (
    <div>
      {isLoading ? (
        <LoadingState />
      ) : (
        <>
          {renderParents()}

          {data && data?.children?.length > 0 && (
            <div className="flex w-full flex-col items-center pt-5">
              <hr className="mb-[15px] h-[1px] w-[30px] rotate-90 border-none bg-black opacity-100" />
              <hr className="h-[1px] w-full border-none bg-black opacity-100" />
            </div>
          )}
          {renderChildren()}
        </>
      )}

      <Toaster />
    </div>
  );
}

export default AddFamily;
