<script setup>
import { useTagsStore } from '~/store/tags';

const tagsStore = useTagsStore();
const route = useRoute();
const router = useRouter();

await tagsStore.getTag(route.params.id);

let formData = ref({
  name: tagsStore.tag.name,
});

async function update() {
  await tagsStore.updateTag(route.params.id, formData.value);

  if (!tagsStore.errors) {
    router.push('/admin/tags');
  }
}
</script>

<template>
  <UPageCard class="mt-3" title="Edit Tag">

    <UFormField
      label="Name"
      :error="tagsStore.errors?.name?.find(() => true)"
    >
      <UInput
        v-model="formData.name"
        class="w-full"
        placeholder="Tag name"
      />
    </UFormField>

    <UButton block @click="update">Update</UButton>

  </UPageCard>
</template>
