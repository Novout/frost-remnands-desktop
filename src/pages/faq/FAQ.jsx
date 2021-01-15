import { defineComponent } from "vue";
import FAQItem from "@/components/faq/FAQItem.jsx";

export default defineComponent({
  name: "FAQ",
  setup() {
    return () => (
      <>
        <section class="bg-default-white overflow-y-auto dark:bg-dark-bg p-:5 h-screen pt-bar w-full">
          <h1 class="h1-title">FAQ</h1>
          <p class="mt-:1">Aqui estará todas as dúvidas sobre a aplicação Desktop e de Restos da Geada de forma geral.</p>
          <FAQItem 
            title="Por que existe este software?"
            description="Por ser diferente de D&D 5e, adaptar a ficha em outros sistemas como Foundry e Roll20 acaba sendo muito complicado, além de não ter todos os recursos necessários para as novas mecânicas do cenário."
          />
          <FAQItem 
            title="Terá WebSocket futuramente?"
            description="Não está nos planos."
          />
          <FAQItem 
            title="O que está implementato de forma automatizada?"
            description="Até o momento, qualquer valor que não é possível de ser alterado (como a proficiência, por exemplo, que já calcula com o bônus da origem de rouanir)."
          />
          <router-link class="border px-:2 py-:1 border-default-black dark:border-default-white" to="/">Voltar</router-link>
        </section>
      </>
    )
  }
});
