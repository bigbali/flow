<script>
	import { onMount } from "svelte";

    onMount(() => import('$lib'));
</script>

<canvas id="canvas"></canvas>
<canvas id="overlay"></canvas>

<style>
    canvas {
        position: absolute;
        overflow-y: clip;
    }

    #canvas {
        background: black;
    }

    #overlay {
        z-index: 10;
    }
</style>
