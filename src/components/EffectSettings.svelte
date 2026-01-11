<script lang="ts">
    import type { EffectId } from "$lib/type";

    import Effect0 from "$lib/effect0/settings.svelte";
    import Effect1 from "$lib/effect1/settings.svelte";
    import Effect2 from "$lib/effect2/settings.svelte";
    import Effect3 from "$lib/effect3/settings.svelte";

    export let effectId: EffectId;
</script>

<div class="effect-settings">
    {#if effectId === "effect0"}
        <Effect0 />
    {:else if effectId === "effect1"}
        <Effect1 />
    {:else if effectId === "effect2"}
        <Effect2 />
    {:else if effectId === "effect3"}
        <Effect3 />
    {:else}
        not assigned bro
    {/if}
</div>

<style>
    .effect-settings {
        position: absolute;
        background-color: pink;
        right:0;
        top: 0;
        width: 10rem;
        height: 10rem;
        z-index: 99;
    }
</style>