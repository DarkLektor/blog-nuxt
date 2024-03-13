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

function performSearch() {
  searchTerm.value ?
      router.push({path: '', query: {q: searchTerm.value}}).catch(err => {
      }) :
      router.push({path: ''}).catch(err => {
      });
}

const debouncedSearch = () => debounce(performSearch, 500);
</script>

<style scoped>
</style>
