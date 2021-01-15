import { 
  defineComponent,  
  onMounted, 
} from "vue";
import { JsonFileSync } from "_/services/fs";
import { useCharacterStore } from "-/character";
import { useToast } from "vue-toastification";
import { useToggle } from "@/use/toggle";
import HabilityItem from "@/components/profile/HabilityItem.jsx";
import InventoryItem from "@/components/profile/InventoryItem.jsx";
import ExpertiseItem from "@/components/profile/ExpertiseItem.jsx";
import ProficiencyItem from "@/components/profile/ProficiencyItem.jsx";
import GenericsView from "@/components/profile/GenericsView.jsx";
import GenericsMain from "@/components/profile/GenericsMain.jsx";
import HabilityModal from "@/components/profile/HabilityModal.jsx";
import DataAside from "@/components/profile/DataAside.jsx";
import GenericsAside from "@/components/profile/GenericsAside.jsx";
import ExaustAside from "@/components/profile/ExaustAside.jsx";
import ResourceAside from "@/components/profile/ResourceAside.jsx";
import HitAside from "@/components/profile/HitAside.jsx";
import BreakAside from "@/components/profile/BreakAside.jsx";
import TextAside from "@/components/profile/TextAside.jsx";
import AnotationAside from "@/components/profile/AnotationAside.jsx";
import TalentsAside from "@/components/profile/TalentsAside.jsx";
import "./styles.css";

const GenericsBox = defineComponent({
  setup() {
    const { toggle, open, close } = useToggle();

    onMounted(() => {
      const { TOAST } = JsonFileSync("localisation/pt_BR.json");
      const toast = useToast();
      toast.success(TOAST.PROFILE_DEFAULT_SUCCESS);
    });

    return () => (
      <>
        <GenericsView toggle={toggle.value} close={close} />
        <GenericsMain open={open} />
      </>
    )
  }
})

const AsideTemplate = defineComponent({
  props: {
    title: {
      required: true,
      type: String
    },
    component: {
      required: true
    }
  },
  setup(props) {
    const { toggle, toggleButton } = useToggle();

    return () => (
      <>
        <section class="flex flex-col justify-start items-center bg-profile w-full p-:1 ml-:2 mt-:2">
          <section class="flex justify-between w-full">
            <h2 
              class="font-ralewayMedium"
            >{props.title}</h2>
            <button 
              class="item-right-button" 
              onClick={toggleButton}
            ><font-awesome-icon 
              icon={['fas', 'angle-double-right']} size="sm"
            /></button>
          </section>
          {toggle.value && <props.component />}
        </section>
      </>
    )
  }
})

const ItemsBox = defineComponent({
  setup() {
    const { toggle, open, close } = useToggle();

    const character = useCharacterStore();

    return () => (
      <>
        <HabilityModal 
          toggle={toggle.value} 
          close={close}
        />
        <section class="flex h-auto p-:2">
          <aside 
            class="flex flex-col cursor-pointer flex-nowrap justify-between items-center rounded-lg h-auto w-profile-aside shadow-lg bg-profile p-:1"
            onClick={open}
          >
            <HabilityItem 
              hability="Força" 
              modifier={character.strengthModifier} 
              total={character.hability.strength}
            />
            <HabilityItem 
              hability="Destreza" 
              modifier={character.dexterityModifier} 
              total={character.hability.dexterity} 
            />
            <HabilityItem 
              hability="Constituição" 
              modifier={character.constitutionModifier}  
              total={character.hability.constitution} 
            />
            <HabilityItem 
              hability="Inteligência" 
              modifier={character.intelligenceModifier} 
              total={character.hability.intelligence} 
            />
            <HabilityItem 
              hability="Sabedoria" 
              modifier={character.wisdomModifier} 
              total={character.hability.wisdom} 
            />
            <HabilityItem 
              hability="Carisma" 
              modifier={character.charismaModifier} 
              total={character.hability.charisma}
            />
          </aside>
          <section class="flex flex-col flex-nowrap justify-between items-center rounded-lg h-auto w-profile-main ml-:2 dark:bg-default-black">
            <ProficiencyItem />
            <ExpertiseItem />
          </section>
          <section class="flex flex-col flex-nowrap justify-start items-center h-auto w-profile-general ml-:1">
            <GenericsAside />
            <DataAside />
            <AsideTemplate 
              title="Exaustão" 
              component={ExaustAside}
            />
            <AsideTemplate 
              title="Recursos" 
              component={ResourceAside}
            />
            <AnotationAside />
            <AsideTemplate 
              title="Vida" 
              component={HitAside}
            />
            <AsideTemplate 
              title="Descrição" 
              component={TextAside}
            />
            <AsideTemplate 
              title="Ponto de Quebra" 
              component={BreakAside}
            />
            <InventoryItem />
            <AsideTemplate 
              title="Talentos" 
              component={TalentsAside}
            />
          </section>
        </section>
      </>
    )
  }
})

export default defineComponent({
  name: "CharacterProfile",
  setup() {
    return () => (
      <section class="bg-default-white dark:bg-dark-one pt-bar">
        <GenericsBox />
        <ItemsBox />
      </section>
    )
  }
});
