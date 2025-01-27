<template>
    <div v-if="visible" class="modal">
        <div class="modal-content">
            <h2>Detalhes do Cavaleiro</h2>
            <div class="details">
                <p><strong>Nome:</strong> {{ knight.name }}</p>
                <p><strong>Apelido:</strong> {{ knight.nickname }}</p>
                <p><strong>Data de Nascimento:</strong> {{ knight.birthday }}</p>
                <p><strong>Armas:</strong></p>
                <ul>
                    <li v-for="(weapon, index) in knight.weapons" :key="index">
                        {{ weapon.name }} (Mod: {{ weapon.mod }}, Atributo: {{ weapon.attr }}, Equipado: {{
                            weapon.equipped ? 'Sim' : 'Não' }})
                    </li>
                </ul>
                <p><strong>Atributos:</strong></p>
                <ul>
                    <li>Força: {{ knight.attributes?.strength }}</li>
                    <li>Destreza: {{ knight.attributes?.dexterity }}</li>
                    <li>Constituição: {{ knight.attributes?.constitution }}</li>
                    <li>Inteligência: {{ knight.attributes?.intelligence }}</li>
                    <li>Sabedoria: {{ knight.attributes?.wisdom }}</li>
                    <li>Carisma: {{ knight.attributes?.charisma }}</li>
                </ul>
                <p><strong>Atributo Principal:</strong> {{ knight.keyAttribute }}</p>
                <p><strong>É Herói:</strong> {{ knight.isHero ? 'Sim' : 'Não' }}</p>
            </div>
            <div class="button-group">
                <BaseButton variant="primary" @click="$emit('close')">Fechar</BaseButton>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import BaseButton from './BaseButton.vue';
import type { Knight } from '@/types/knight';

export default defineComponent({
    components: { BaseButton },
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
        knight: {
            type: Object as PropType<Partial<Knight>>,
            required: true,
        },
    },
    emits: ['close'],
});
</script>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: #232730;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-height: 600px;
    color: white;
    overflow: auto;
}

strong {
    color: #7967c9;
}

.details {
    margin-bottom: 1rem;
}

.details p {
    margin: 0.5rem 0;
}

.details ul {
    margin: 0.5rem 0 1rem 0;
    padding-left: 1rem;
}

.details ul li {
    list-style-type: disc;
    margin-left: 1rem;
}

.button-group {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
</style>