import Image from "next/image";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import React from "react";
import type { MouseEventHandler } from "react";
import type { Points, Status } from "@prisma/client";

type SidebarProps = {
  pointsData: Points | null | undefined;
  handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  statusPopUp: boolean;
  updateStatusPopUp: MouseEventHandler<HTMLButtonElement> | undefined;
  statusData: Status | null | undefined;
};

const Sidebar = ({
  pointsData,
  handleSubmit,
  statusPopUp,
  updateStatusPopUp,
  handleChange,
  statusData,
}: SidebarProps) => {
  const { data: sessionData } = useSession();

  return (
    <>
      <div className=" m-2 flex h-full w-3/12 items-start justify-center rounded bg-slate-800 pt-8">
        <div className="flex  w-8/12 flex-col items-center justify-between">
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
          <div className="flex h-full w-full flex-col items-center justify-center pt-2">
            <p className="text-center text-2xl text-red-500">
              {sessionData?.user.name}
            </p>
            {statusData?.status ? (
              <p className="pt-4 text-sm">&quot;{statusData?.status}&quot;</p>
            ) : (
              <p className="text-sm italic">
                &quot;Create your first status&quot;
              </p>
            )}
            <button
              onClick={updateStatusPopUp}
              className="mt-4 rounded-md bg-red-500 p-1 text-sm"
            >
              Share new status!
            </button>
            <p className="pt-4 text-sm font-bold">
              Haki:
              <span className="text-red-500">
                {pointsData?.points && Math.round(pointsData.points * 0.1)}
              </span>
            </p>
          </div>
        </div>
      </div>
      {statusPopUp && (
        <div className="absolute w-1/4 rounded bg-slate-600 p-8 transition delay-700 ease-in-out">
          <button
            onClick={updateStatusPopUp}
            className="absolute right-4 top-2 cursor-pointer text-sm text-slate-800"
          >
            x
          </button>
          <form
            action=""
            className="flex w-full items-center justify-center"
            onSubmit={handleSubmit}
          >
            <input
              className="mr-2 w-full rounded bg-slate-500 p-2 text-zinc-700"
              type="text"
              onChange={handleChange}
              placeholder="add your new status here"
            />
            <button
              type="submit"
              className="rounded-md bg-red-500 p-2  text-sm"
            >
              update
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Sidebar;
