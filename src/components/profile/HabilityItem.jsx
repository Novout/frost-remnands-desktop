import { 
  defineComponent, 
} from "vue";
import "./styles.css";

export default defineComponent({
  props: {
    hability: {
      type: String,
      required: true
    },
    modifier: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    return () => (
      <>
        <article class="character-hability">
          <p class="text-sm font-ralewayMedium">{props.hability}</p>
          <p class="text-2xl font-ralewayMedium">{props.modifier}</p>
          <p 
            class="bg-default-white text-lg dark:bg-dark-one dark:text-default-white py-1 px-:3 rounded-full text-default-black hover:bg-default-blueLight dark:hover:bg-default-blueDark font-ralewayMedium"
          >{props.total}</p>
        </article>
      </>
    )
  }
})