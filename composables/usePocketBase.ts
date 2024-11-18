import PocketBase from "pocketbase";

const runtimeConfig = useRuntimeConfig();
const pb = new PocketBase(runtimeConfig.public.pocketbaseUrl);

export default function () {
  return pb;
}
