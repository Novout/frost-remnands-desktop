import { defineComponent } from "vue";

export default defineComponent({
  name: "FAQ",
  setup() {
    return () => (
      <>
        <section class="bg-default-white dark:bg-dark-one pt-bar w-full">
          <h1>FAQ</h1>
        </section>
      </>
    )
  }
});
