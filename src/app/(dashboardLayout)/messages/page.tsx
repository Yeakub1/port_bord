"use client";

import LargeSpinner from "@/components/Spinner/LargeSpinner";
import { useGetMessagesQuery } from "@/redux/features/messages/messagesApi";
import { useEffect } from "react";

const MessagesPage = () => {
  const { data: messagesData, error, refetch } = useGetMessagesQuery(undefined);

  useEffect(() => {
    if (error) {
      const retryTimeout = setTimeout(() => {
        refetch();
      }, 2000);

      return () => clearTimeout(retryTimeout);
    }
  }, [error, refetch]);

  return (
    <div className="px-4 pb-[100px]">
      <h2 className="text-3xl text-gray-600 pt-5 pb-10">Messages</h2>
      <div className="xl:container mx-auto">
        {!messagesData && <LargeSpinner />}
        {messagesData?.data?.map((item: any) => {
          return (
            <div key={item.id} className="bg-gray-200 p-4 rounded-md mb-5">
              <h2 className="mb-2 text-gray-800">
                <span className="font-semibold">Name:</span> {item.name}
              </h2>
              <p className="mb-2 text-gray-800">
                <span className="font-semibold">Email:</span> {item.email}
              </p>
              <p className="bg-gray-100 text-gray-800 min-h-20 p-2 rounded-md">
                {item.message}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessagesPage;
