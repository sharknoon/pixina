<template>
  <div class="d-flex flex-column align-items-center">
    <div>Keine Favoriten vorhanden</div>
    <div>
      <small>
        Füge Favoriten hinzu, indem du
        <font-awesome-icon
          :icon="['far', 'star']"
          style="color: orange"
          size="lg"
        />
        auswählst
      </small>
    </div>
  </div>
</template>
<script>
export default {
  name: "NoFavorites",
};
</script>
