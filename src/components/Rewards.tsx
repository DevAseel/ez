import React from "react";
import { type Awards } from "@prisma/client";

type RewardsParams = {
  haki: number;
  allAwards: Awards[] | undefined;
};

const Rewards = ({ haki, allAwards }: RewardsParams) => {
  return (
    <div className="ml-2 h-1/2 pt-12">
      <div className="text-xl font-bold">Rewards</div>
      <div className="h-full rounded-md bg-slate-700">
        <div className="">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Reward
                </th>
                <th scope="col" className="px-6 py-3">
                  Haki
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {allAwards?.map((award) => (
                <tr key={award.id} className="border-t-[1px] border-gray-500 ">
                  <td
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    {award.award}
                  </td>
                  <td scope="row" className="px-6 py-3">
                    {award.karma}
                  </td>

                  <td scope="row" className="px-6 py-3">
                    {haki >= award.karma && (
                      <button
                        className={
                          "cursor-pointer rounded-md bg-red-500 p-1 text-[0.75rem]"
                        }
                      >
                        Claim
                      </button>
                    )}
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

export default Rewards;
