import { cn } from "~/lib/utils";
import { Button } from "../ui/button";

import { NAV_CONSTS } from "~/constants/navConsts";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
//   playlists: Playlist[]
// }

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname();

  return (
    // <div className={cn("pb-12", className)}>
    <div
      className={cn(
        "light-border shadow-light-300 max-xl:[266px] sticky left-0 top-0 flex h-screen w-fit  flex-col justify-between overflow-y-auto  border-r dark:shadow-none max-md:hidden md:w-[200px] lg:w-[266px] ",
        className,
      )}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Views
          </h2>
          <div className="space-y-2">
            {NAV_CONSTS.map((item, idx) => {
              const isActive =
                (pathname?.includes(item.route) && item.route.length > 1) ||
                pathname === item.route;
              return (
                <Link href={item.route} className="flex items-center" key={idx}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={24}
                      height={24}
                      className="mr-2"
                    />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
