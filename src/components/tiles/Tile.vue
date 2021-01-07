<template>
  <div class="position-fixed top-0 end-0 bottom-0 start-0">
    <div class="d-flex flex-column h-100 bg-dark">
      <div class="text-light d-flex justify-content-end align-items-center p-2">
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
                :url="window.location.origin + $route.fullPath"
                :title="title"
                :description="
                  'Diese Kachel dient zur Vorlage, um sie mit Pixelhobby Pixeln nachzubauen.' +
                  ' Sie repräsentiert einen kleinen Teil (0,2%) des Gesamtbildes.' +
                  ' Im Gesamtbild liegt diese Kachel in der ' +
                  (Math.floor(number / 20) + 1) +
                  '. Reihe (von unten) und ' +
                  (number % 20) +
                  '. Spalte.'
                "
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
          @click="
            $router.push({ path: '/colorCount', query: { tiles: [number] } })
          "
        >
          <font-awesome-icon :icon="['fal', 'info-circle']" size="lg" />
        </button>
        <button
          type="button"
          class="btn btn-dark ms-2"
          @click="$store.commit('toggleFavoriteTile', number)"
        >
          <font-awesome-icon
            :icon="[$store.getters.isFavorite(number) ? 'fas' : 'fal', 'star']"
            size="lg"
          />
        </button>
        <button type="button" class="btn btn-dark ms-2" @click="printTile()">
          <font-awesome-icon :icon="['fal', 'print']" size="lg" />
        </button>
        <button type="button" class="btn btn-dark ms-2" @click="goBack()">
          <font-awesome-icon :icon="['fal', 'times']" size="lg" />
        </button>
      </div>
      <pinch-zoom
        limitZoom="15"
        disableZoomControl="disable"
        class="flex-grow-1 h-100 bg-transparent"
      >
        <img :src="src" class="tile" />
      </pinch-zoom>
      <div class="text-light p-2 text-center">
        {{ title }}
      </div>
    </div>
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
import func from "../../../vue-temp/vue-editor-bridge";

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
      shareNetworks: [
        { name: "Email", icon: ["fas", "envelope"] },
        { name: "WhatsApp", icon: ["fab", "whatsapp"] },
        { name: "Facebook", icon: ["fab", "facebook-f"] },
        { name: "Twitter", icon: ["fab", "twitter"] },
        { name: "Telegram", icon: ["fab", "telegram-plane"] },
      ],
    };
  },
  components: {
    PinchZoom: () => import("vue-pinch-zoom"),
    TileColors: () => import("../tools/TileColors.vue"),
  },
  computed: {
    title: function () {
      return (
        "Bild Nr. " +
        number +
        " (" +
        (number % 20) +
        "|" +
        Math.floor(number / 20) +
        ")"
      );
    },
    src: function () {
      return require("./../../assets/images/templates/" +
        number +
        "-detailed.webp");
    },
    number: function () {
      return this.$route.params.number;
    },
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    printTile() {
      printJS({
        printable: this.src,
        type: "image",
        header: this.title,
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
.tile {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}
</style>
<style lang="scss">
.bg-transparent {
  background-color: transparent;
}
</style>