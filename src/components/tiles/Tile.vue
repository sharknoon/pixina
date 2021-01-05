<template>
  <div class="position-fixed top-0 end-0 bottom-0 start-0">
    <div v-if="infoTile == null" class="d-flex flex-column h-100">
      <div class="bg-dark text-light row p-2">
        <div class="col"></div>
        <div class="col d-flex justify-content-center align-items-center">
          Bild Nr. {{ tile.title }}
        </div>
        <div class="col d-flex justify-content-end align-items-center">
          <div class="dropdown">
            <button
              class="btn btn-dark ms-2"
              type="button"
              id="shareMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <font-awesome-icon :icon="['fal', 'share']" size="lg" />
            </button>
            <ul class="dropdown-menu" aria-labelledby="shareMenuButton">
              <li v-for="network in shareNetworks" :key="network.name">
                <ShareNetwork
                  :network="network.name.toLowerCase()"
                  url="https://news.vuejs.org/issues/180"
                  title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
                  description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
                  class="dropdown-item"
                >
                  <font-awesome-icon
                    :icon="network.icon"
                    class="me-1 share-dropdown-icon"
                  />
                  {{ network.name }}
                </ShareNetwork>
              </li>
            </ul>
          </div>

          <button
            type="button"
            class="btn btn-dark ms-2"
            @click="infoTile = tile"
          >
            <font-awesome-icon :icon="['fal', 'info-circle']" size="lg" />
          </button>
          <button
            type="button"
            class="btn btn-dark ms-2"
            @click="$store.commit('toggleFavoriteTile', tile.number)"
          >
            <font-awesome-icon
              :icon="[
                $store.getters.isFavorite(tile.number) ? 'fas' : 'fal',
                'star',
              ]"
              size="lg"
            />
          </button>
          <button
            type="button"
            class="btn btn-dark ms-2"
            @click="printTile(tile)"
          >
            <font-awesome-icon :icon="['fal', 'print']" size="lg" />
          </button>
          <button
            type="button"
            class="btn btn-dark ms-2"
            @click="$emit('closeTile')"
          >
            <font-awesome-icon :icon="['fal', 'times']" size="lg" />
          </button>
        </div>
      </div>
      <pinch-zoom
        limitZoom="15"
        disableZoomControl="disable"
        class="bg-dark flex-grow-1 h-100"
      >
        <img :src="tile.src" />
      </pinch-zoom>
    </div>
    <TileColors
      v-if="infoTile != null"
      :tiles="[this.tile]"
      :withFavorites="true"
      @close="infoTile = null"
      class="bg-white"
    />
  </div>
</template>
<script>
import printJS from "print-js";
import Vue from "vue";
import VueSocialSharing from "vue-social-sharing";
Vue.use(VueSocialSharing);

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPrint,
  faStar as falStar,
  faInfoCircle,
  faShare,
  faTimes,
} from "@fortawesome/pro-light-svg-icons";
import { faStar as fasStar } from "@fortawesome/pro-solid-svg-icons";
import {
  faWhatsapp,
  faFacebookF,
  faTwitter,
  faTelegramPlane,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/pro-solid-svg-icons";

library.add(
  faPrint,
  falStar,
  fasStar,
  faInfoCircle,
  faShare,
  faTimes,
  faEnvelope,
  faWhatsapp,
  faFacebookF,
  faTwitter,
  faTelegramPlane
);

export default {
  name: "Tile",
  data() {
    return {
      infoTile: null,
      shareNetworks: [
        { name: "Email", icon: ["fas", "envelope"] },
        { name: "WhatsApp", icon: ["fab", "whatsapp"] },
        { name: "Facebook", icon: ["fab", "facebook-f"] },
        { name: "Twitter", icon: ["fab", "twitter"] },
        { name: "Telegram", icon: ["fab", "telegram-plane"] },
      ],
    };
  },
  props: {
    tile: {
      type: Object,
      required: true,
    },
  },
  components: {
    PinchZoom: () => import("vue-pinch-zoom"),
    TileColors: () => import("../tools/TileColors.vue"),
  },
  methods: {
    printTile(tile) {
      printJS({
        printable: tile.src,
        type: "image",
        header: tile.title,
        headerStyle: "font-family: Arial;",
        style: "@page { size: auto;  margin: 0mm; } html { margin: 10% }",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.share-dropdown-icon {
  min-width: 1.25rem;
}
</style>