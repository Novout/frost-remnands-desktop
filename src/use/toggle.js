import { ref } from "vue";

export const useToggle = () => {
  const toggle = ref(false);
  const open = () => toggle.value = true;
  const close = () => toggle.value = false;
  const toggleButton = () => toggle.value = !toggle.value;

  return { 
    toggle,
    open,
    close,
    toggleButton 
  };
}