const message = ref<string>("");
const isShown = ref<boolean>(false);
const color = ref<"error" | "success" | undefined>(undefined);

export const useToast = () => {
  const success = (msg: string) => {
    debugger;
    isShown.value = true;
    message.value = msg;
    color.value = "success";
  };

  const error = (msg: string) => {
    isShown.value = true;
    message.value = msg;
    color.value = "error";
  };

  const close = () => {
    isShown.value = false;
    message.value = "";
    color.value = undefined;
  };

  return {
    message,
    isShown,
    success,
    error,
    close,
  };
};
