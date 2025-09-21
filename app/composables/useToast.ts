export const useToast = () => {
  const message = ref<string>("");
  const isShown = ref<boolean>();

  let timer: NodeJS.Timeout;

  onMounted(() => {
    timer = setTimeout(() => {
      isShown.value = false;
    }, 3000);
  });

  onUnmounted(() => {
    clearTimeout(timer);
  });

  const show = () => {
    isShown.value = true;
  };

  return {
    message,
    isShown,
    show,
  };
};
