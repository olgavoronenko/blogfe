<script setup>
import { useTagsStore } from '~/store/tags';
let router = useRouter();
let route = useRoute();
let tagsStore = useTagsStore();

await tagsStore.getTags(route.query.page);

let page = ref(parseInt(route.query.page ?? 1));

async function to(page) {
  router.push({
    query: { page }
  });
  await tagsStore.getTags(page);
}

let columns = [
  {
    accessorKey: 'id',
    header: '#',
    cell: (cell) => '#' + cell.getValue()
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'created_at',
    header: 'Created',
  },
  {
    accessorKey: 'updated_at',
    header: 'Updated',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            content: { align: 'end' },
            items: getRowItems(row),
            'aria-label': 'Actions dropdown'
          },
          () =>
            h(UButton, {
              icon: 'i-lucide-ellipsis-vertical',
              color: 'neutral',
              variant: 'ghost',
              class: 'ml-auto',
              'aria-label': 'Actions dropdown'
            })
        )
      )
    }
  }
];

function getRowItems(row) {
  return [
    {
      label: 'View',
      to: `/admin/tags/${row.original.id}/view`
    },
    {
      label: 'Edit',
      to: `/admin/tags/${row.original.id}/edit`
    },
    {
      label: 'Delete',
      async onSelect() {
        await tagsStore.deleteTag(row.original.id);
        await tagsStore.getTags(route.query.page);
      }
    },
  ]
}
</script>

<template>
  <UButton class="my-2" to="/admin/tags/create">Create</UButton>

  <UPagination
    class="my-4 flex justify-center"
    v-model:page="page"
    @update:page="to"
    show-edges
    :sibling-count="2"
    :items-per-page="tagsStore.pagination.per_page"
    :total="tagsStore.pagination.total"
  />

  <UTable :data="tagsStore.tags" :columns="columns" class="flex-1" />
</template>
