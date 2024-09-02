import React from "react";
import { CreateBlinkComp } from "./blinkpage";
import { useGetSellerDetails } from "@/hooks/useGetUser";
import Loading from "../Loading";
import EditBlink from "./editBlink";

interface BlinkRenderProps {
  address: string;
}

export default function BlinkRender({ address }: BlinkRenderProps) {
  const { data, isLoading, error } = useGetSellerDetails(address);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading data</div>; // Add error handling UI as needed
  }

  return data?.data?.blinkCreated ? (
    <EditBlink address={address} />
  ) : (
    <CreateBlinkComp address={address} />
  );
}
