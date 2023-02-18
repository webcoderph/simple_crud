<template>
  <div class="hello">
    <router-link class="
      inline-block
      px-6 py-2.5
      bg-blue-400
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-500
      hover:shadow-lg
      focus:bg-blue-700
      focus:shadow-lg
      focus:outline-none
      focus:ring-0 float-right
      active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out mb-10" to="/create">
      Create
    </router-link>
    <div style="clear:both;"></div>
    <div v-for="post in posts" v-bind:key="post.id">

      <article class="mb-8 border-dotted border-b pb-8 border-gray-300">

        <h1 class="capitalize text-2xl font-bold">{{ post.title }}</h1>

        <p class="text-base font-thin excerpt">{{ post.content }}</p>

        <router-link class="
            inline-block px-2 py-2
            bg-yellow-300 text-gray-600 mt-5
            font-medium text-xs leading-tight
            uppercase rounded shadow-md hover:bg-yellow-400
            hover:shadow-lg focus:bg-yellow-200 focus:shadow-lg
            focus:outline-none focus:ring-0 active:bg-blue-800
            active:shadow-lg transition duration-150 ease-in-out
            mr-5
            " :to="{ name: 'edit', params: { id: post.id }}">
          Edit
      </router-link>
        <button class="
            inline-block px-2 py-2
            bg-red-300 text-gray-600 mt-5
            font-medium text-xs leading-tight
            uppercase rounded shadow-md hover:bg-red-400
            hover:shadow-lg focus:bg-red-200 focus:shadow-lg
            focus:outline-none focus:ring-0 active:bg-blue-800
            active:shadow-lg transition duration-150 ease-in-out
            " @click="deletePost(post.id)">
          Delete
      </button>
        <span class="block md:inline md:float-right md:pt-4 pt-2 created-date">
          {{ moment(post.updated_at).fromNow() }}
        </span>
        <div style="clear:both;"></div>
      </article>

    </div>

  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';

export default {
  props: ['posts', 'deletePost'],
  setup() {
    return {
      moment,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
