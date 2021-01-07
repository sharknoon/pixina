<template>
  <div id="tools-wrapper" class="h-100">
    <TileSelection :multi-selection="true" />
  </div>
</template>
<script>
import TileSelection from "./tools/TileSelection";

export default {
  name: "Tools",
  components: {
    TileSelection,
  },
};
</script>
