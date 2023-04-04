import React from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Image from "next/image";
const Dashboard = () => {
  const { data: sessionData } = useSession();
  console.log(sessionData?.user.image);
  return (
    <>
      <Head>
        <title>EZ - Employee engagement Zone</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="flex h-screen w-screen items-center justify-center bg-slate-900">
        <div className="flex h-5/6 w-8/12 items-center justify-center">
          <div className=" m-2 flex h-full w-3/12 items-start justify-center rounded bg-slate-800 pt-8">
            <div className="flex w-8/12 items-center justify-between">
              <div className="">
                {sessionData?.user.image ? (
                  <Image
                    src={sessionData?.user.image}
                    alt="user profile image"
                    width="75"
                    height="75"
                    className="rounded-full"
                  />
                ) : (
                  <Image
                    src="https://cdn.discordapp.com/embed/avatars/1.png"
                    alt="user profile image"
                    width="75"
                    height="75"
                  />
                )}
              </div>
              <div className="flex h-full w-full flex-col items-start justify-center pl-4">
                <p className="text-left text-2xl text-red-500">
                  {sessionData?.user.name}
                </p>
                <p className="text-sm">status</p>
              </div>
            </div>
          </div>
          <div className=" m-2 h-full w-9/12 rounded bg-slate-800">dash</div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
