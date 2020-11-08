import { defineComponent } from "vue";
import { useCharacterStore } from "@/store/character";
import "./box.css";

export default defineComponent({
  name: "ItemBox",
  setup() {
    const talents = [
      { title: 'Alouuu', value: 'al' },
      { title: 'Alouuu', value: 'al' },
      { title: 'Alouuu', value: 'al' },
      { title: 'Alouuu', value: 'al' },
      { title: 'Alouuu', value: 'al' },
      { title: 'Alouuu', value: 'al' },
      { title: 'Alouuu', value: 'al' },
      { title: 'Alouuu', value: 'al' },
      { title: 'Alouuu', value: 'al' },
      { title: 'Alouuu', value: 'al' },
      { title: 'Alouuu', value: 'al' },
      { title: 'Alouuu', value: 'al' },
      { title: 'Alouuu', value: 'al' },
    ]

    const character = useCharacterStore();

    const pushTalent = (talent) => {
      console.log(character)
      console.log(talent.value)
      // character.talents.push(talent);
    }
    
    return { talents, pushTalent }
  },
  render() {
    return (
      <>
        <section class="talents">
          {this.talents.map(talent => 
            <button onClick={this.pushTalent}>{talent.title}</button>
          )}
        </section>
      </>
    )
  }
});
