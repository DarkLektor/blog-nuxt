<template>
  <div class="w-100 d-flex justify-content-between">
    <select
        v-if="totalCount > 12"
        class="form-select w-auto"
        :value="limit" @change="onLimitChange"
    >
      <option value="12">12</option>
      <option value="25">25</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>

    <nav aria-label="navigation">
      <ul
          class="pagination"
          v-if="totalCount > limit"
      >

        <li class="page-item">
          <button type="button" class="btn btn-dark" @click.prevent="goToPage(1)"
                  :disabled="page <= 1">
            |<
          </button>
        </li>

        <li class="page-item">
          <button type="button" class="btn btn-dark" @click.prevent="goToPage(page - 1)"
                  :disabled="page <= 1">
            <
          </button>
        </li>

        <li class="page-item" v-if="showStartEllipsis">
          <span class="btn btn-dark disabled">...</span>
        </li>

        <li class="page-item" v-for="pageNum in visiblePages" :key="pageNum">
          <button type="button" class="btn btn-dark" :class="{ active: page === pageNum }"
                  @click.prevent="goToPage(pageNum)">{{ pageNum }}
          </button>
        </li>

        <li class="page-item" v-if="showEndEllipsis">
          <span class="btn btn-dark disabled">...</span>
        </li>

        <li class="page-item">
          <button type="button" class="btn btn-dark" @click.prevent="goToPage(page + 1)"
                  :disabled="page >= totalPages">
            >
          </button>
        </li>

        <li class="page-item">
          <button type="button" class="btn btn-dark" @click.prevent="goToPage(totalPages)"
                  :disabled="page >= totalPages">
            >|
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';

const props = defineProps({
  page: Number,
  totalCount: Number,
  limit: Number
});

const totalPages = computed(() => Math.ceil(props.totalCount / props.limit));

const visiblePages = computed(() => {
  let pages = [];
  let startPage = Math.max(props.page - 1, 1);
  let endPage = startPage + 2;

  if (endPage > totalPages.value) {
    endPage = totalPages.value;
    startPage = Math.max(endPage - 2, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
});

const showStartEllipsis = computed(() => visiblePages.value[0] > 2);
const showEndEllipsis = computed(() => visiblePages.value[visiblePages.value.length - 1] < totalPages.value - 1);

const emit = defineEmits(['updatePageAndLimit']);

const goToPage = (pageNum: number) => {
  if (pageNum >= 1 && pageNum <= totalPages.value) {
    emit('updatePageAndLimit', {page: pageNum, limit: props.limit});
  }
}

const onLimitChange = (event: Event) => {
  emit('updatePageAndLimit', {page: props.page, limit: +event.target.value});
}
</script>

<style scoped>
</style>
