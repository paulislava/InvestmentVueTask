<template>
  <Vue3DraggableResizable
    class="window"
    v-if="!closed"
    @drag-end="change"
    @resize-end="change"
    v-model:x="x"
    v-model:h="h"
    v-model:w="w"
    v-model:y="y"
  >
    <div class="window-header">
      <a class="close-btn" @click="close">X</a>
      <div class="window-title">{{ item.title }}</div>
    </div>
    <div class="window-text"></div>
  </Vue3DraggableResizable>
</template>

<script>
import Vue3DraggableResizable from "vue3-draggable-resizable";
import { setWindow } from "@/main";

const grid_size_cell = 50;

const grid_size = (val) => Math.round(val / grid_size_cell) * grid_size_cell;

export default {
  components: { Vue3DraggableResizable },
  name: "WindowDraggable",
  props: {
    item: Object,
  },
  data() {
    return {
      x_new: this.item.x,
      y_new: this.item.y,
      w_new: this.item.w,
      h_new: this.item.h,
      closed_new: this.item.closed
    };
  },
  computed: {
    x: {
      get() { return this.item.x },
      set(val) { this.x_new = val },
    },
    y: {
      get() { return this.item.y },
      set(val) { this.y_new = val },
    },
    w: {
      get() { return this.item.w },
      set(val) { this.w_new = val },
    },
    h: {
      get() { return this.item.h },
      set(val) { this.h_new = val },
    },
    closed: {
      get() { return this.item.closed },
      set(val) { this.closed_new = val }
    }
    
  },
  methods: {
    save() {
      this.$emit('update', {
        id: this.item.id,
        x: this.x_new,
        y: this.y_new,
        w: this.w_new,
        h: this.h_new,
        closed: this.closed_new
      });
    },
    change() {
      this.x = grid_size(this.x_new)
      this.y = grid_size(this.y_new)
      this.w = grid_size(this.w_new)
      this.h = grid_size(this.h_new)
      this.closed = false

      this.save();
    },
    close() {
      this.closed = true;
      setWindow(this);
      this.save();
    },
  },
};
</script>

<style scoped>
.window {
  box-sizing: border-box;
  background: white;
  border: 1px solid black;
  position: absolute;
  cursor: pointer;
  min-width: 150px;
  min-height: 70px;
}
.window.closed {
  background: red;
}
.window-header {
  position: relative;
  font-weight: bold;
  border-bottom: 1px solid black;
  padding: 0.5em 2em;
}

.window-header .close-btn {
  position: absolute;
  right: 1em;
}
</style>

