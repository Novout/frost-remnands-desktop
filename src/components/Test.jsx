import { defineComponent, toRefs } from "vue";

export default defineComponent({
  props: {
    value: {
      required: true,
      type: Number
    }
  },
  setup(props) {
    const { value } = toRefs(props);
    const increment = () => {
      value.value++;
    }
    return () => (
      <>
        <p>{value.value}</p>
        <button onClick={increment}>Increment</button>
      </>
    )
  }
});