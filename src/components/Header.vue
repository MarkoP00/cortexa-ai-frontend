<template>
  <div
    class="py-4 px-6 bg-gray-800 shadow-md flex justify-between items-center">
    <img
      class="w-8 h-8"
      :src="aiRobot"
      alt="Cortexa Image" />
    <h1 class="text-lg font-semibold">Cortexa</h1>
    <button
      @click="logout"
      class="text-gray-400 cursor-pointer hover:text-white">
      Logout
    </button>
  </div>
</template>

<script setup leng="ts">
import aiRobot from "../assets/ai-robot.png";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const logout = () => {
  userStore.logout();
  router.push("/");
};
</script>
