<script lang="ts">
	import type { PageProps } from './$types';
    import type { EffectId } from '$lib/type';
    import {initializeCanvas} from '$lib';
    import { onMount, setContext } from 'svelte';
    import { canvasStore } from '$lib/canvas_up';
    // import { setCanvasContext } from '$lib/canvas_up';
	let { data }: PageProps = $props();




    $effect(() => {
        const canvas = initializeCanvas(data.effect as EffectId);

        canvasStore.set(canvas);

        // setCanvasContext(canvas);

        canvas.initialize().then(() => canvas.beginRenderLoop());

        return () => canvas.endRenderLoop();
    });
</script>
<!-- <div>{@html data.content}</div> -->

<canvas id="canvas"></canvas>
<canvas id="overlay"></canvas>

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
