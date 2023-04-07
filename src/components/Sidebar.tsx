import Image from "next/image";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";

const Sidebar = () => {
  const { data: sessionData } = useSession();

  // trpc calls
  const { data: statusData } = api.status.getLatest.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined,
    }
  );

  const { data: pointsData } = api.points.getLatest.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined,
    }
  );
  //   states
  const [statusPopUp, setStatuPopUp] = useState(false);
  const [userStatus, setUserStatus] = useState("false");
  const postStatus = api.status.addNew.useMutation();
  const postPoints = api.points.addNew.useMutation();

  const updateStatusPopUp = () => {
    setStatuPopUp(!statusPopUp);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserStatus(event.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userStatus.length !== 0 && sessionData?.user.name) {
      postStatus.mutate({
        status: userStatus,
        userName: sessionData.user.name,
      });

      if (!pointsData?.points) {
        postPoints.mutate({
          points: 1,
          userName: sessionData.user.name,
        });
      } else {
        postPoints.mutate({
          points: pointsData?.points + 1,
          userName: sessionData.user.name,
        });
      }

      setStatuPopUp(!statusPopUp);
    }
  };
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
          <div
            onClick={updateStatusPopUp}
            className="absolute right-4 top-2 cursor-pointer text-sm text-slate-800"
          >
            x
          </div>
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
