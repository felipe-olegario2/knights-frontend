<template>
  <div style="max-width: 1200px; margin: 0 auto;">
    <div class="header">
      <h1>Lista de Cavaleiros</h1>
      <div class="filter-group">
        <label for="filter">Filtrar:</label>
        <select id="filter" v-model="selectedFilter" @change="applyFilter">
          <option value="">Todos</option>
          <option value="heroes">Apenas Heróis</option>
        </select>
      </div>
    </div>
    <BaseButton variant="primary" @click="showModal()" style="margin: 1rem 0 1rem 0;">Criar Cavaleiro</BaseButton>
    <KnightsList :knights="knights" @edit="editKnight" @markAsHero="markAsHero" />
    <KnightModal v-if="isModalVisible" :visible="isModalVisible" :knight="currentKnight" @save="saveKnight"
      @close="closeModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue';
import api from '../services/api';
import KnightModal from '@/components/KnightModal.vue';
import BaseButton from '@/components/BaseButton.vue';
import KnightsList from '@/components/KnightsList.vue';

export default defineComponent({
  components: { KnightsList, KnightModal, BaseButton },
  setup() {
    const knights = ref([]);
    const isModalVisible = ref(false);
    const currentKnight = reactive({
      name: '',
      nickname: '',
      birthday: '',
      weapons: [
        {
          name: '',
          mod: 0,
          attr: 'strength',
          equipped: false,
        },
      ],
      attributes: {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0,
      },
      keyAttribute: 'strength',
    });

    const selectedFilter = ref(''); // Filtro selecionado

    const fetchKnights = async (filter = '') => {
      const response = await api.get('/knights', {
        params: { filter },
      });
      knights.value = response.data;
    };

    const applyFilter = () => {
      fetchKnights(selectedFilter.value);
    };

    const showModal = () => {
      Object.assign(currentKnight, {
        name: '',
        nickname: '',
        birthday: '',
        isHero: false,
        weapons: [
          {
            name: '',
            mod: 0,
            attr: 'strength',
            equipped: false,
          },
        ],
        attributes: {
          strength: 0,
          dexterity: 0,
          constitution: 0,
          intelligence: 0,
          wisdom: 0,
          charisma: 0,
        },
        keyAttribute: 'strength',
      });
      isModalVisible.value = true;
    };

    const editKnight = (knight: any) => {
      Object.assign(currentKnight, knight);
      isModalVisible.value = true;
    };

    const saveKnight = async (knight: any) => {
      if (knight._id) {
        await api.put(`/knights/${knight._id}`, { nickname: knight.nickname });
      } else {
        await api.post('/knights', knight);
      }
      fetchKnights(selectedFilter.value); // Refetch com o filtro aplicado
      closeModal();
    };

    const closeModal = () => {
      isModalVisible.value = false;
      Object.assign(currentKnight, {
        _id: null,
        name: '',
        nickname: '',
        birthday: '',
        weapons: [],
        attributes: {
          strength: 0,
          dexterity: 0,
          constitution: 0,
          intelligence: 0,
          wisdom: 0,
          charisma: 0,
        },
        keyAttribute: 'strength',
      });
    };

    const markAsHero = async (id: string) => {
      await api.delete(`/knights/${id}`);
      fetchKnights(selectedFilter.value); // Refetch com o filtro aplicado
    };

    onMounted(() => fetchKnights());

    return {
      knights,
      isModalVisible,
      currentKnight,
      selectedFilter,
      showModal,
      editKnight,
      saveKnight,
      closeModal,
      markAsHero,
      applyFilter,
    };
  },
});
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 150px;
  align-items: center;
  margin-bottom: 1rem;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

label {
  font-family: 'Press Start 2P', cursive;
}

select {
  padding: 0.5rem;
  font-size: 1rem;
  font-family: 'Press Start 2P', cursive;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

select:focus {
  border-color: #2563eb;
  box-shadow: 0 0 4px rgba(37, 99, 235, 0.5);
}
</style>
