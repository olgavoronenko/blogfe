<script setup>
defineProps(['post', 'snippet']);
</script>
<template>
  <UBlogPost 
  :title="post.title" 
  :image="post.images[0]?.path" 
  :authors="[{name: post.user.name}]" 
  :description="snippet ? post.snippet : post.body" 
  :to="'/post/' + post.slug"></UBlogPost>
</template>


