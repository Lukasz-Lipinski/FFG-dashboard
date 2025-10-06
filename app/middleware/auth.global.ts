export default defineNuxtRouteMiddleware((to, from) => {
  const user = useCookie("user");
  if (to.path.includes("dashboard") && !user.value) {
    return navigateTo("/");
  }
  if (user.value && to.path === "/") {
    return navigateTo("/dashboard");
  }
});
