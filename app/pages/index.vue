<script setup>
import { usePostsStore } from '~/store/posts';
let router = useRouter();
let route = useRoute();
let postsStore = usePostsStore();

await postsStore.getPosts(route.query.page);

let page = ref(parseInt(route.query.page ?? 1) );

async function to(page) {
    router.push({
        query: {
            page: page
        }
    });
    await postsStore.getPosts(page);
}
</script>

<template>
    <UPagination class="my-4 flex justify-center" v-model:page="page" @update:page="to" show-edges :sibling-count="2" :itemsPerPage="postsStore.pagination.per_page" :total="postsStore.pagination.total" />
    <UPageColumns>
        <PostCard v-for="post in postsStore.posts" :post="post" :snippet="true"></PostCard>
    </UPageColumns>
</template>