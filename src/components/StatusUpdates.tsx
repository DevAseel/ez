import React from "react";
import type { Status } from "@prisma/client";
import Image from "next/image";

type StatusUpdatesParams = {
  allStatus: Status[] | undefined;
};
const StatusUpdates = ({ allStatus }: StatusUpdatesParams) => {
  return (
    <div className="h-full w-1/2">
      <p className="mb-2 text-xl font-bold">Status updates</p>
      <div className="h-full w-full overflow-auto">
        {allStatus?.map((status, index) => (
          <div key={index} className="mb-2 rounded bg-slate-700 p-2">
            <div className="flex w-full items-center justify-around">
              {status.image && (
                <Image
                  src={status.image}
                  alt="user profile image"
                  width="50"
                  height="50"
                  className="rounded-full"
                />
              )}
              <div className="w-full pl-2">
                <p className="text-base text-red-500">{status.userName}</p>
                <p className="pb-2 text-sm">{status.status}</p>
                <p className="text-right text-[0.75rem] text-slate-400">
                  {status.createdAt.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusUpdates;
