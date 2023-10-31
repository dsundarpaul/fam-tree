import Head from "next/head";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Family Tree</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="font-mono text-5xl font-extrabold tracking-tight text-stone-800 sm:text-[5rem]">
            Family Tree
          </h1>

          <Button
            asChild
            variant={"outline"}
            className="border-stone-900 hover:bg-slate-400"
          >
            <Link href="/add-family">Get Started</Link>
          </Button>
        </div>
      </main>
    </>
  );
}
