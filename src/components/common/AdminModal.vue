<template>
  <div
    id="admin-modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="adminModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="adminModalLabel" class="modal-title">Admin mode</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body d-grid gap-3">
          <div v-for="(p, i) in progressTitles" :key="i" class="form-floating">
            <input
              :id="i"
              v-model="progress[i]"
              type="number"
              min="0"
              max="500"
              class="form-control"
              :placeholder="p"
              style="z-index: 1"
              @keydown="filterInput"
            />
            <label :for="i">{{ p }}</label>
          </div>
        </div>
        <div class="modal-footer">
          <div>{{ progress.amountTiles }} out of 500 tiles selected</div>
          <button
            type="button"
            :disabled="!progress.validState"
            class="btn btn-primary d-flex align-items-center gap-2"
            @click="sendUpdatedProgress()"
          >
            <div
              v-if="apiLoading"
              class="spinner-border spinner-border-sm me-1"
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
            <div v-if="apiError">
              <font-awesome-icon :icon="['fas', 'xmark']" />
            </div>
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Modal } from "bootstrap";
import { useProgressStore } from "@/stores/progress";

const progress = useProgressStore();

const apiLoading = ref(false);
const apiError = ref(false);

function filterInput(event: KeyboardEvent) {
  if (event.key === "Delete") return;
  if (event.key === "Backspace") return;
  if (event.key < "0" || event.key > "9") {
    event.preventDefault();
  }
}

let modal: Modal;
let modalShown = false;

function sendUpdatedProgress() {
  apiLoading.value = true;
  apiError.value = false;
  fetch("https://pixina.app/api/v1/progress", {
    method: "POST",
    body: JSON.stringify({
      finished: progress.finished,
      inProgress: progress.inProgress,
      reserved: progress.reserved,
      available: progress.available,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response: Response) => {
      apiLoading.value = false;
      if (response.status >= 200 && response.status <= 299) {
        modal?.hide();
      } else {
        apiError.value = true;
      }
    })
    .catch((error: Error) => {
      apiLoading.value = false;
      apiError.value = true;
      console.error(error);
    });
}

const progressTitles = ref({
  finished: "Finished tiles",
  inProgress: "In progress tiles",
  reserved: "Reserved tiles",
  available: "Available tiles",
});

onMounted(() => {
  document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.altKey && event.shiftKey && event.key === "A") {
      if (modalShown) return;
      if (!modal) {
        modal = new Modal("#admin-modal");
        const element = document.getElementById("admin-modal");
        if (element) {
          element.addEventListener("show.bs.modal", () => {
            modalShown = true;
          });
          element.addEventListener("hide.bs.modal", () => {
            modalShown = false;
          });
        }
      }
      modal.show();
      event.preventDefault();
      event.stopPropagation();
    }
  });
});
</script>
