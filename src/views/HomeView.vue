<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
    <Spinner v-if="loading"></Spinner>
    <div class="p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
      <img
        :src="aiRobot"
        alt=""
        class="mx-auto w-24 h-24 mb-4" />
      <h1 class="text-2xl md:text-3xl font-semibold mb-4 text-center">
        Welcome to
        <strong
          class="font-bold bg-gradient-to-r from-blue-500 to-blue-400 text-transparent bg-clip-text"
          >Cortexa</strong
        >
        AI Chatbot
      </h1>
      <input
        type="text"
        class="w-full p-2 mb-2 bg-gray-700 text-white focus:outline-none rounded-lg"
        placeholder="Name"
        v-model="name" />
      <input
        type="email"
        class="w-full p-2 mb-2 bg-gray-700 text-white focus:outline-none rounded-lg"
        placeholder="Email"
        v-model="email" />

      <button
        @click="createUser"
        class="w-full p-2 cursor-pointer transition-all duration-200 bg-blue-600 rounded-lg hover:bg-blue-800"
        :disabled="loading">
        {{ loading ? "Logging in..." : "Start Chat" }}
      </button>

      <p
        v-if="error"
        class="text-red-400 text-center mt-2">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup leng="ts">
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import axios from "axios";
import Spinner from "../components/Spinner.vue";
import aiRobot from "../assets/ai-robot.png";

const userStore = useUserStore();
const router = useRouter();
const name = ref("");
const email = ref("");
const loading = ref(false);
const error = ref("");

async function createUser() {
  if (!name.value || !email.value) {
    error.value = "Name and Email are required";
    return;
  }

  loading.value = true;
  error.value = "";

  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/register-user`,
      {
        name: name.value,
        email: email.value,
      }
    );

    userStore.setUser({
      userId: data.userId,
      name: data.userId,
      email: data.email,
    });

    router.push("/chat");
  } catch (err) {
    error.value = "Something went wrong... Please try again";
  } finally {
    loading.value = false;
  }
}
</script>
