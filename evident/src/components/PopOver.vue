<script setup>
import { ref } from 'vue'

defineProps({
  handleSelect: {
    type: Function
  },
  key: {
    type: String
  }
})

let isPopoverVisible = ref(false)
function showPopover() {
  isPopoverVisible.value = true
}
function hidePopover() {
  isPopoverVisible.value = false
}
</script>

<template>
  <div>
    <div v-on:mouseover="showPopover" v-on:mouseleave="hidePopover">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        fill="#000000"
        height="20px"
        width="20px"
        version="1.1"
        id="Layer_1"
        viewBox="0 0 512 512"
        xml:space="preserve"
      >
        <g>
          <g>
            <path
              d="M8.959,0v81.89l201.666,201.666V512l90.75-60.5V283.556L503.041,81.89V0H8.959z M271.125,435.31l-30.25,20.167V292.416    h30.25V435.31z M279.985,262.166h-47.969L60.6,90.75h390.802L279.985,262.166z M472.791,60.5H39.209V30.25h433.582V60.5z"
            />
          </g>
        </g>
      </svg>
      <div v-show="isPopoverVisible" class="popover">
        <div class="popover-item" @click="handleSelect(key, 'asc')">Filter Asc</div>
        <div class="popover-item" @click="handleSelect(key, 'desc')">Filter Desc</div>
      </div>
    </div>
  </div>
</template>

<style>
.popover {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
.popover-item {
  padding: 5px 10px;
}
.popover-item:hover {
  background-color: #edebf1;
  border-radius: 5px;
}
</style>
