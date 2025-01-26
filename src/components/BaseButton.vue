<template>
    <button class="base-button" :class="[variant, $attrs.class]" @click="$emit('click')">
        <slot />
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        variant: {
            type: String,
            default: 'default', // Variantes: 'default', 'primary', 'danger'
            validator: (value: string) => ['default', 'primary', 'danger'].includes(value),
        },
    },
});
</script>

<style scoped>
.base-button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-family: 'Press Start 2P', cursive;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.base-button.default {
    background-color: #7967c9;
    /* Cinza claro */
    color: #111827;
    /* Cinza escuro */
}

.base-button.default:hover {
    background-color: #d7caf2;
}

.base-button.primary {
    background-color: #d7caf2;
    /* Azul */
    color: #7967c9;
    /* Cinza escuro */
}

.base-button.primary:hover {
    background-color: #7967c9;
    color: #d7caf2;
}

.base-button.danger {
    background-color: #dc2626;
    /* Vermelho */
    color: white;
}

.base-button.danger:hover {
    background-color: #b91c1c;
}
</style>