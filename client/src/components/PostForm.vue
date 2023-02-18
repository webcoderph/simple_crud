<!-- eslint-disable max-len -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class="about">
    <div class="w-full">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 class="text-lg font-bold mb-5">{{ formTitle }} Post</h1>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
            Title
          </label>
          <input
            v-model="mutablePost.title"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Title...">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="content">
            Content
          </label>
          <textarea
            v-model="mutablePost.content"
            class="
              form-control
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
            id="content"
            rows="3"
            placeholder="Your message"
          ></textarea>
        </div>
        <div class="flex items-center justify-between">
          <button @click="submitForm" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            {{ formTitle }}
          </button>
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs">
        &copy;2023 All rights reserved.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['submitForm', 'post', 'formTitle'],
  setup(props) {
    return {
      mutablePost: props.post,
    };
  },
};
</script>
