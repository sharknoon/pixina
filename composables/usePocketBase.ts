import PocketBase from "pocketbase";

//const runtimeConfig = useRuntimeConfig();
const pb = new PocketBase("https://pocketbase.pixina.app");

export default function () {
  return pb;
}
