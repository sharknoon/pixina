<template>
  <div
    :id="'infoModal' + color.number_pixelhobby"
    class="modal fade"
    tabindex="-1"
    :aria-labelledby="'infoModal' + color.number_pixelhobby + 'Label'"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 align-middle mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h5 class="modal-title">{{ t("color-informations") }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <h6>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {{ t("original-image") }}
          </h6>
          <table class="table table-borderless">
            <colgroup>
              <col class="w-50" />
              <col class="w-50" />
            </colgroup>
            <tbody>
              <tr>
                <th>{{ t("color") }}</th>
                <td :style="'background: ' + color.hex_place" />
              </tr>
              <tr>
                <th>{{ t("name") }}</th>
                <td>{{ t(color.name_place) }}</td>
              </tr>
              <tr>
                <th>{{ t("color-value") }}</th>
                <td>{{ color.hex_place }}</td>
              </tr>
              <tr>
                <th>{{ t("index") }}</th>
                <td>{{ color.number_place }}</td>
              </tr>
            </tbody>
          </table>
          <h6>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            {{ t("pixelhobby-pixels") }}
          </h6>
          <table class="table table-borderless mb-0">
            <colgroup>
              <col class="w-50" />
              <col class="w-50" />
            </colgroup>
            <tbody>
              <tr>
                <th>{{ t("color") }}</th>
                <td :style="'background: ' + color.hex_pixelhobby" />
              </tr>
              <tr>
                <th>{{ t("name") }}</th>
                <td>{{ t(color.name_pixelhobby) }}</td>
              </tr>
              <tr>
                <th>{{ t("color-value") }}</th>
                <td>{{ color.hex_pixelhobby }}</td>
              </tr>
              <tr>
                <th>{{ t("code") }}</th>
                <td>{{ color.number_pixelhobby }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps({
  color: {
    type: Object,
    required: true,
  },
});
</script>
<style lang="scss" scoped>
.table > :not(caption) > * > * {
  padding: 0;
}
</style>
