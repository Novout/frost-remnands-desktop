import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      required: true,
      type: String
    },
    description: {
      required: true,
      type: String
    }
  },
  setup(props) {
    return () => (
      <section class="py-:2">
        <h2 class="h2-title">{props.title}</h2>
        <p class="font-ralewayMedium">{props.description}</p>
      </section>
    )
  }
})