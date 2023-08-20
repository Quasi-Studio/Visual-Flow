<template>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BlockPreset from './vf/block/preset/shape';
import { FlowGraph } from './vf/flowgraph/flowgraph';
import mdui from "mdui"

export default defineComponent({
  name: 'App'
});

// inject('apppppp')


let flowgraph = new FlowGraph()
flowgraph.create_block(new BlockPreset.text('jellyfish', { font: 'Consolas', text_size: 30 }))

document.getElementById('apppppp')!.appendChild(flowgraph.el)

mdui.mutation()

</script>

<style scoped>


</style>