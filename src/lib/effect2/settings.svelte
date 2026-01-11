<script>
    import { effect2State as state} from "./settings.store.svelte";
</script>

<div>
    <label>
        Multiplier
        <input type="range" min={state.multiplier.min} max={state.multiplier.max} bind:value={state.multiplier.value}>
    </label>
</div>