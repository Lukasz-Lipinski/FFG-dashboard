const message = ref<string>("");
const isShown = ref<boolean>({ required: true, default: false });
const color = ref<"error" | "success" | undefined>(undefined);

export const useToast = () => {
  const success = (msg: string) => {
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
    color,
    isShown,
    success,
    error,
    close,
  };
};
