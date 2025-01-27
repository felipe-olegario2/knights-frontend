<template>
  <div v-if="visible" class="modal">
    <div class="modal-content">
      <h2 style="color: white;">{{ knight._id ? 'Editar Cavaleiro' : 'Criar Cavaleiro' }}</h2>
      <form @submit.prevent="save">
        <template v-if="!knight._id">
          <label for="name">Nome:</label>
          <input id="name" v-model="knight.name" type="text" required />
          <label for="nickname">Apelido:</label>
          <input id="nickname" v-model="knight.nickname" type="text" required />

          <label for="birthday">Data de Nascimento:</label>
          <input id="birthday" v-model="knight.birthday" type="date" required />

          <label style="color: white;">Armas:</label>
          <div v-for="(weapon, index) in knight.weapons" :key="index" class="weapon-group">
            <div>
              <label for="weapon-name">Nome da Arma:</label>
              <input id="weapon-name" v-model="weapon.name" type="text" placeholder="Ex: Espada" required />
            </div>
            <div>
              <label for="weapon-mod">Modificador:</label>
              <input id="weapon-mod" v-model.number="weapon.mod" type="number" placeholder="Ex: 3" required />
            </div>
            <div>
              <label for="weapon-attr">Atributo:</label>
              <select id="weapon-attr" v-model="weapon.attr" required>
                <option value="strength">Força</option>
                <option value="dexterity">Destreza</option>
                <option value="constitution">Constituição</option>
                <option value="intelligence">Inteligência</option>
                <option value="wisdom">Sabedoria</option>
                <option value="charisma">Carisma</option>
              </select>
            </div>
            <div>
              <label>
                Equipado:
                <input v-model="weapon.equipped" type="checkbox" />
              </label>
            </div>
          </div>
          <BaseButton variant="primary" @click="addWeapon">Adicionar Arma</BaseButton>

          <label style="color: white;">Atributos:</label>
          <div class="attributes">
            <div>
              <label for="strength">Força:</label>
              <input id="strength" v-model.number="knight.attributes.strength" type="number" required />
            </div>
            <div>
              <label for="dexterity">Destreza:</label>
              <input id="dexterity" v-model.number="knight.attributes.dexterity" type="number" required />
            </div>
            <div>
              <label for="constitution">Constituição:</label>
              <input id="constitution" v-model.number="knight.attributes.constitution" type="number" required />
            </div>
            <div>
              <label for="intelligence">Inteligência:</label>
              <input id="intelligence" v-model.number="knight.attributes.intelligence" type="number" required />
            </div>
            <div>
              <label for="wisdom">Sabedoria:</label>
              <input id="wisdom" v-model.number="knight.attributes.wisdom" type="number" required />
            </div>
            <div>
              <label for="charisma">Carisma:</label>
              <input id="charisma" v-model.number="knight.attributes.charisma" type="number" required />
            </div>
          </div>

          <label for="keyAttribute" style="color: white;">Atributo Principal:</label>
          <select id="keyAttribute" v-model="knight.keyAttribute" required>
            <option value="strength">Força</option>
            <option value="dexterity">Destreza</option>
            <option value="constitution">Constituição</option>
            <option value="intelligence">Inteligência</option>
            <option value="wisdom">Sabedoria</option>
            <option value="charisma">Carisma</option>
          </select>
        </template>

        <template v-else>
          <label for="nickname">Apelido:</label>
          <input id="nickname" v-model="knight.nickname" type="text" required />
        </template>

        <div class="button-group">
          <BaseButton variant="primary" type="submit">Salvar</BaseButton>
          <BaseButton variant="danger" @click="$emit('close')">Cancelar</BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseButton from './BaseButton.vue';

export default defineComponent({
  components: { BaseButton },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    knight: {
      type: Object,
      required: true,
    },
  },
  emits: ['save', 'close'],
  setup(props, { emit }) {
    const save = () => {
      emit('save', props.knight);
    };

    const addWeapon = () => {
      props.knight.weapons.push({
        name: '',
        mod: 0,
        attr: 'strength',
        equipped: false,
      });
    };

    return { save, addWeapon };
  },
});
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: hsla(268, 100%, 74%, 0.356);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #232730;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-height: 600px;
  overflow: auto;
}

@media (min-width: 1024px) {
    .modal-content {
        width: 600px;
    }
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.weapon-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.attributes div {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-family: 'Press Start 2P', cursive;
  font-size: 0.9rem;
}

input,
select {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  font-family: 'Press Start 2P', cursive;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus,
select:focus {
  border-color: #2563eb;
  box-shadow: 0 0 4px rgba(37, 99, 235, 0.5);
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}
</style>