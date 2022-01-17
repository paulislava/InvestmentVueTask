<template>
  <div class="desk">
    <WindowDraggable
      v-for="(element, index) in windows"
      v-model="windows[index]"
      :key="element.id"
      :item="element"
      @update="updateWindow"
    ></WindowDraggable>
    <button
      v-if="windows.filter((e) => !e.closed).length < windows_count"
      class="return-btn"
      type="button"
      @click="returnWindow"
    >
      Return window to the desk
    </button>
  </div>
</template>
<style scoped>
button.return-btn {
  padding: 2em 3em;
  position: absolute;
  bottom: 2em;
  z-index: 50;
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
}
</style>
<script>
import WindowDraggable from "./WindowDraggable.vue";
import { setWindow, windows_count } from "@/main";

export default {
  name: "Desk",
  components: {
    WindowDraggable,
  },
  data() {
    return {
      windows_count,
    };
  },
  computed: {
    windows: {
      get() {
        let windows = this.$store.state.windows;
        console.log(windows)
        if(!windows.length) {
            windows = []
            for (let i = 1; i <= windows_count; i++) {
                const window = { id: i, title: "Window " + i, closed: false };
                setWindow(window);
                windows.push(window);
            }
            return windows
        } else
            return this.$store.state.windows;
      },
      set(value) {
        this.$store.commit("updateWindows", value);
        console.log(this.windows);
      },
    },
  },

  methods: {
    updateWindow() {
      let windows = this.windows
      this.windows = windows
    },
    returnWindow() {
      let windows = this.windows;
      windows.every((element) => {
        if (element.closed) {
          element.closed = false;
          return false;
        }
        return true;
      });
      this.windows = windows;
    },
  },
};
</script>
