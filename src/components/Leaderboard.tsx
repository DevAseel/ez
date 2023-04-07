import React from "react";
import type { Points } from "@prisma/client";

type LeaderboardProps = {
  allPoints: Points[] | undefined;
};

const Leaderboard = ({ allPoints }: LeaderboardProps) => {
  return (
    <div className="ml-2 h-1/2">
      <p className="mb-2 text-xl font-bold">Leaderboard</p>
      <div className="h-full rounded-md bg-slate-700">
        <div className="">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  User
                </th>
                <th scope="col" className="px-6 py-3">
                  Points
                </th>
              </tr>
            </thead>
            <tbody>
              {allPoints?.map((user, index) => (
                <tr key={index} className="border-t-[1px] border-gray-500 ">
                  <td scope="row" className="px-6 py-3">
                    {index + 1}
                  </td>
                  <td
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    {user.userName}
                  </td>
                  <td scope="row" className="px-6 py-3">
                    {user.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
