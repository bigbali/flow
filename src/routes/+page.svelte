<script>
	// import { onMount } from "svelte";
    // import { initializeCanvas } from "$lib";

    // onMount(() => initializeCanvas('effect2'));
</script>

<!-- <canvas id="canvas"></canvas>
<canvas id="overlay"></canvas> -->

<style>
    canvas {
        position: absolute;
        overflow-y: clip;
    }

    #canvas {
        background: #1e1e23;
    }

    #overlay {
        z-index: 10;
    }
</style>
