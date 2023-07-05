import type { V2_MetaFunction } from "@remix-run/cloudflare";
import {useLoaderData} from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Hello world" },
    { name: "description", content: "Hello world" },
  ];
};

export const loader = () => 'world'

export default function Index() {
  const message = useLoaderData()

  return <h1>Hello {message}</h1>;
}
