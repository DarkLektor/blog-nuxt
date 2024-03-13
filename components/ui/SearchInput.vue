<template>
  <div class="search-input">
    <input
        type="text"
        class="form-control"
        placeholder="Search..."
        v-model="searchTerm"
        @input="debouncedSearch"
    />
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useDebounce} from '~/composables/useDebounce';
import {useRouter} from 'vue-router';

const searchTerm = ref('');
const {debounce} = useDebounce();
const router = useRouter();
const route = useRoute();

onMounted(() => {
  searchTerm.value = route.query.q?.toString() || '';
})

function performSearch() {
  searchTerm.value?.trim() ?
      router.replace({query: {q: searchTerm.value.trim()}}) :
      router.push({query: {}})
}

const debouncedSearch = () => debounce(performSearch, 500);
</script>

<style scoped>
</style>
