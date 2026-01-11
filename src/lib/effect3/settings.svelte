<script lang="ts">
    import { canvasStore } from "$lib/canvas_up";
    import Effect3 from ".";
    import { ParticleShape, effect3State as state} from "./settings.store.svelte";
    // import { getCanvasContext } from "$lib/canvas_up";

    // canvasStore

    let c = canvasStore!;
    
    // const canvas = getCanvasContext();
</script>

<div>
    <label>
        Sampling Size
        <input type="range" min={state.samplingSize.min} max={state.samplingSize.max} bind:value={state.samplingSize.value}>
    </label>
    <label>
        Shape
        <select bind:value={state.particleShape}>
            {#each Object.values(ParticleShape) as option}
                <option value={option}>
                    {option}
                </option>
           {/each}
        </select>
    </label>
    <button onclick={async () => {
        await $c?.initialize();
        $c?.beginRenderLoop();
    }}>
        Update
    </button>
    <button onclick={async () => {
        $c?.update();
    }}>
        draw
    </button>
    <button onclick={async () => {
        ($c?.effect as Effect3).toggleRequestNextFrame();
        $c?.beginRenderLoop();
    }}>
        Toggle Animation
    </button>
</div>