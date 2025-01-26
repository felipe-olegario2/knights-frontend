<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Apelido</th>
          <th>Experiência</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="knight in knights" :key="knight._id">
          <td>{{ knight.name }}</td>
          <td>{{ knight.nickname }}</td>
          <td>{{ knight.exp }}</td>
          <td>
            <BaseButton variant="primary" @click="$emit('edit', knight)" class="edit-button">Editar</BaseButton>
            <BaseButton variant="danger" @click="$emit('markAsHero', knight._id)" v-if="!knight.isHero">Marcar como
              Herói</BaseButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import BaseButton from './BaseButton.vue';

interface Knight {
  _id: string;
  name: string;
  nickname: string;
  exp: number;
  isHero: boolean;
}

export default defineComponent({
  components: {
    BaseButton,
  },
  props: {
    knights: {
      type: Array as PropType<Knight[]>,
      required: true,
    },
  },
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}

.edit-button {
  margin-bottom: 1rem;
  margin-right: 0;
  width: fit-content;
}

@media (min-width: 1024px) {
  h1 {
    font-size: 2rem;
  }

  .edit-button {
    margin-right: 1rem;
  }
}
</style>