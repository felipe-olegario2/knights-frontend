<template>
  <div>
    <div class="cards-container">
      <div v-for="knight in knights" :key="knight._id" class="card">
        <img @click="showDetails(knight)" :src="knight.isHero ? './hero.png' : './knight.png'" alt="Knight or Hero"
          class="card-image" />
        <div class="card-content" @click="showDetails(knight)">
          <h3>{{ knight.name }}</h3>
          <p><strong>Apelido:</strong> {{ knight.nickname }}</p>
          <p><strong>Experiência:</strong> {{ knight.exp }}</p>
        </div>
        <div class="card-actions">
          <BaseButton variant="primary" @click="$emit('edit', knight)">Editar</BaseButton>
          <BaseButton variant="danger" v-if="!knight.isHero" @click="$emit('markAsHero', knight._id)" style="max-width: 150px;">
            Tornar Herói
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Detalhes do Cavaleiro -->
    <KnightDetailModal v-if="isDetailModalVisible" :visible="isDetailModalVisible" :knight="selectedKnight"
      @close="closeDetailModal" />
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue';
import KnightDetailModal from './KnightDetailModal.vue';
import BaseButton from './BaseButton.vue';

// Tipo para o Cavaleiro
interface Knight {
  _id: string;
  name: string;
  nickname: string;
  birthday: string;
  exp: number;
  weapons: {
    name: string;
    mod: number;
    attr: string;
    equipped: boolean;
  }[];
  attributes: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  keyAttribute: string;
  isHero: boolean;
}

export default defineComponent({
  components: { KnightDetailModal, BaseButton },
  props: {
    knights: {
      type: Array as PropType<Knight[]>,
      required: true,
    },
  },
  setup(props) {
    const isDetailModalVisible = ref(false);
    const selectedKnight = ref<Partial<Knight>>({});

    const showDetails = (knight: Knight) => {
      selectedKnight.value = knight;
      isDetailModalVisible.value = true;
    };

    const closeDetailModal = () => {
      isDetailModalVisible.value = false;
      selectedKnight.value = {}; // Reseta para um objeto vazio
    };

    return {
      isDetailModalVisible,
      selectedKnight,
      showDetails,
      closeDetailModal,
    };
  },
});
</script>

<style scoped>
.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.card {
  background-color: #232730;
  padding: 1rem;
  border-radius: 8px;
  width: 350px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.card-image {
  width: 100%;
  height: 150px;
  object-fit: contain;
}

.card-content {
  color: white;
  text-align: center;
  margin-top: 1rem;
}

.card-content h3 {
  margin: 0.5rem 0;
  font-size: 1.2rem;
}

.card-content p {
  margin: 0.3rem 0;
  font-size: 0.9rem;
}

.card-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}
</style>
