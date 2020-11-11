import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { useCharacterStore } from "@/store/character";
import "./create.css";

const ItemBox = defineComponent({
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

export default defineComponent({
  name: "CharacterCreate",
  components: {
    ItemBox
  },
  setup() {
    const router = useRouter();
    const character = useCharacterStore();

    const state = reactive({
      race: "nekro",
      origin: "rouanir",
      class: "",
      name: "",
      description: "",
      breakPoint: "",
      level: 1,
    });

    const error = reactive({
      class: true,
      name: true,
      description: true,
      breakPoint: true,
    });

    const initialMenu = () => {
      router.push("/");
    }

    const goToProfile = () => {
      character.$patch({
        race: state.race,
        origin: state.origin,
        class: state.class,
        name: state.name,
        description: state.description,
        breakPoint: state.breakPoint,
        level: state.level,
        classLevel: 1,
        talents: [],
        equipment: [],
        anotations: []
      })

      router.push("/profile");
    }

    const validateFormulary = () => {
      state.class === "" ? error.class = true : error.class = false
      state.name === "" ? error.name = true : error.name = false
      state.description === "" ? error.description = true : error.description = false
      state.breakPoint === "" ? error.breakPoint = true : error.breakPoint = false

      if(!error.class && !error.name && !error.description && !error.breakPoint) {
        goToProfile()
      }
    }

    return () => (
      <>
        <main class="character">
          <h1>Ficha de Personagem</h1>
          <span>Crie seu personagem seguindo a ordem recomendada do cenário. Seu personagem irá ficar salvo no sistema para utilização futura.</span>
          <h2>Raça</h2>
          <select vModel={state.race}>
            <option value="nekro" selected>Nekro</option> 
            <option value="tiudren">Tiudren</option>
            <option value="asserkarus">Asserkarus</option>
            <option value="phortem">Phortem</option>
            <option value="neutral">Raça Neutra</option>
          </select>
          <h2>Origem</h2>
          <select vModel={state.origin}>
            <option value="rouanir" selected>Complexo de Rouanir</option> 
            <option value="agoni">Consciência Agoni</option>
            <option value="gyni">Gyni</option>
            <option value="yayr">Henismo de Yayr</option>
            <option value="pacyentesn">Império de Pacyentesn</option>
            <option value="aligned">Não-Alinado</option>
            <option value="frederitch">República Henista de Frederitch</option>
          </select>
          <h2>Classes</h2>
          <select vModel={state.class}>
            { state.origin === 'frederitch' && (<option value="shooter">Atirador</option>) } 
            { state.origin === 'rouanir' && (<option value="taught">Autodidata</option>) } 
            { state.race === 'asserkarus' && (<option value="barbarian">Bárbaro</option>) } 
            { state.origin === 'pacyentesn' && (<option value="bard">Bardo</option>) } 
            { state.origin === 'yayr' && (<option value="witcher">Bruxo</option>) } 
            { state.race === 'phortem' && (<option value="conjurer">Conjurador</option>) } 
            { state.origin === 'aligned' && (<option value="corrupt">Corrupto</option>) } 
            { state.race === 'nekro' && (<option value="inventor">Inventor</option>) } 
            { state.race === 'tiudren' && (<option value="fighter">Lutador</option>) } 
            { state.origin === 'agoni' && (<option value="monk">Monge</option>) } 
            { state.origin === 'gyni' && (<option value="necromancer">Necromante</option>) } 
            { state.race === 'neutral' && (<option value="shooter">Psiônico</option>) } 
          </select>
          <h2>Nome do Personagem</h2>
          <input vModel={state.name} type="text" />
          <h2>Nome do Personagem</h2>
          <select vModel={state.level}>
            <option value="1" selected>1</option> 
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option> 
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
          </select>
          <h2>Descrição do Personagem</h2>
          <textarea 
            vModel={state.description} 
            rows = "8"
          />
          <h2>Ponto de Quebra</h2>
          <textarea 
            vModel={state.breakPoint} 
            rows = "8"
          />
          <h2>Talentos</h2>
          <ItemBox />
          <article>
            <button onClick={initialMenu}>Menu Inicial</button>
            <button onClick={validateFormulary}>Finalizar</button>
          </article>
        </main>
      </>
    )
  }
});
