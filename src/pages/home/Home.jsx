import { defineComponent } from "vue";
import HomeItem from "@/components/home/HomeItem.jsx";
import "./styles.css";

export default defineComponent({
  name: "Home",
  components: {
    HomeItem
  },
  setup() {
    return () => (
      <>
        <main class="home">
          <HomeItem />
        </main>
      </>
    )
  }
});
