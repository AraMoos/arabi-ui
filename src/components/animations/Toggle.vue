<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

const props = withDefaults(defineProps<{
    show?: boolean
    duration?: number
}>(), {
    show: false,
    duration: 200
});

const content = ref();
const hide = ref(true);
const maxHeight = ref(`${400}px`);

const durationFormat = computed(() => {
    return `${props.duration}ms`;
});

onMounted(() => {
    if (content.value) {
        const mH = content.value.offsetHeight;
        maxHeight.value = `${mH}px`;
    }
    hide.value = false;
})
</script>
<template>
    <Transition name="toggle">
        <div v-if="show || hide" class="toggle">
            <div ref="content" :class="{ hide }">
                <slot />
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.toggle {
    position: relative;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
}

.hide {
    visibility: hidden;
    position: absolute;
    z-index: 0;
    opacity: 0;
}

.toggle-enter-active {
    animation: toggle v-bind(durationFormat) linear;
}

.toggle-leave-active {
    animation: toggle v-bind(durationFormat) reverse linear;
}

@keyframes toggle {
    0% {
        max-height: 0;
        opacity: 0;
    }

    100% {
        max-height: v-bind(maxHeight);
        opacity: 1;
    }
}
</style>