<script setup>
import { useTagsStore } from '~/store/tags';

const tagsStore = useTagsStore();
const route = useRoute();

await tagsStore.getTag(route.params.id);

let rows = [
  {
    name: 'ID',
    value: tagsStore.tag.id
  },
  {
    name: 'Name',
    value: tagsStore.tag.name
  },
  {
    name: 'Created',
    value: tagsStore.tag.created_at
  },
  {
    name: 'Updated',
    value: tagsStore.tag.updated_at
  }
];
</script>

<template>
  <UPageList class="mt-3">
    <UPageCard
      class="rounded-none"
      v-for="(row, index) in rows"
      :key="index"
    >
      <template #body>
        <UUser
          :name="row.name"
          :description="row.value"
          size="xl"
          class="relative"
        />
      </template>
    </UPageCard>
  </UPageList>
</template>
