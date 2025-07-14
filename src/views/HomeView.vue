<template>
  <div class="h-screen flex items-center justify-center bg-gray-900 text-white">
    <div class="p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
      <img
        :src="robotImage"
        alt=""
        class="mx-auto w-24 h-24 mb-4" />
      <h1 class="text-2xl font-semibold mb-4 text-center">
        Welcome to Cortexa AI Chatbot
      </h1>
      <input
        type="text"
        class="w-full p-2 mb-2 bg-gray-700 text-white focues:outline-none"
        placeholder="Name"
        v-model="name" />
      <input
        type="email"
        class="w-full p-2 mb-2 bg-gray-700 text-white focues:outline-none"
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
import robotImage from "../assets/robot.png";
import axios from "axios";

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
