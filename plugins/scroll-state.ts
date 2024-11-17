export default defineNuxtPlugin(() => {
  const router = useRouter();
  const scrollPositions = new Map();

  // Wait for component to be mounted before adding router hooks
  if (import.meta.client) {
    // Only run on client-side
    router.beforeEach((to, from) => {
      // Ensure we're in browser environment and element exists
      if (typeof window !== "undefined") {
        const mainContent = document.getElementById("main-content");
        if (mainContent) {
          scrollPositions.set(from.fullPath, {
            x: mainContent.scrollLeft,
            y: mainContent.scrollTop,
          });
        }
      }
    });

    router.afterEach((to) => {
      // Ensure we're in browser environment
      if (typeof window !== "undefined") {
        setTimeout(() => {
          const mainContent = document.getElementById("main-content");
          const savedPosition = scrollPositions.get(to.fullPath);

          if (mainContent && savedPosition) {
            mainContent.scrollTo({
              left: savedPosition.x,
              top: savedPosition.y,
              behavior: "instant",
            });
          }
        }, 0);
      }
    });
  }
});
