import PocketBase from "pocketbase";

let pb: PocketBase | undefined = undefined;

export default function () {
  if (!pb) {
    const runtimeConfig = useRuntimeConfig();
    pb = new PocketBase(runtimeConfig.public.pocketbaseUrl);
    pb.autoCancellation(false);
  }

  return pb;
}
