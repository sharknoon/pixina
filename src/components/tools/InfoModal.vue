<template>
  <div
    class="modal fade"
    :id="'infoModal' + color.number_pixelhobby"
    tabindex="-1"
    :aria-labelledby="'infoModal' + color.number_pixelhobby + 'Label'"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <font-awesome-icon
            :icon="['far', 'info-circle']"
            size="lg"
            class="align-middle mb-1 me-2"
          />
          <h5 class="modal-title">
            {{ $t("color-informations") }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <h6>
            <font-awesome-icon :icon="['fas', 'image']" />
            {{ $t("original-image") }}
          </h6>
          <table class="table table-borderless">
            <colgroup>
              <col class="w-50" />
              <col class="w-50" />
            </colgroup>
            <tbody>
              <tr>
                <th>{{ $t("color") }}</th>
                <td :style="'background: ' + color.hex_place"></td>
              </tr>
              <tr>
                <th>{{ $t("name") }}</th>
                <td>{{ $t(color.name_place) }}</td>
              </tr>
              <tr>
                <th>{{ $t("color-value") }}</th>
                <td>{{ color.hex_place }}</td>
              </tr>
              <tr>
                <th>{{ $t("index") }}</th>
                <td>{{ color.number_place }}</td>
              </tr>
            </tbody>
          </table>
          <h6>
            <font-awesome-icon :icon="['fas', 'cubes']" />
            {{ $t("pixelhobby-pixels") }}
          </h6>
          <table class="table table-borderless mb-0">
            <colgroup>
              <col class="w-50" />
              <col class="w-50" />
            </colgroup>
            <tbody>
              <tr>
                <th>{{ $t("color") }}</th>
                <td :style="'background: ' + color.hex_pixelhobby"></td>
              </tr>
              <tr>
                <th>{{ $t("name") }}</th>
                <td>{{ $t(color.name_pixelhobby) }}</td>
              </tr>
              <tr>
                <th>{{ $t("color-value") }}</th>
                <td>{{ color.hex_pixelhobby }}</td>
              </tr>
              <tr>
                <th>{{ $t("code") }}</th>
                <td>{{ color.number_pixelhobby }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "InfoModal",
  props: {
    color: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.table > :not(caption) > * > * {
  padding: 0;
}
</style>