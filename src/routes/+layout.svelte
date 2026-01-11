<script lang="ts">
    import { page } from "$app/state";
    import EffectSettings from '../components/EffectSettings.svelte';
    import '../style.css';

    let items = ["effect0", "effect1", "effect2", "effect3", "effect4"];
</script>

<div class="switch-container">
    <ul class="switch-inner">
        {#each items as item}
            <li class:current={page.data.effect === item}>
                <a href={`/effect/${item}`}>
                    {item}
                </a>
            </li>
        {/each}
    </ul>
</div>
<EffectSettings effectId={page.data.effect} />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
<slot />