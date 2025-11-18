<script>
    import Data from "./Data.svelte";
</script>

<svelte:boundary>
    <Data />

    {#snippet pending()}
        <div>
            <p>Initial loading provided by boundary</p>
        </div>
    {/snippet}

    {#snippet failed(error, reset)}
        <h2>Error</h2>
        <p>{error}</p>
        <button onclick={reset}>Oops! try again</button>
    {/snippet}
</svelte:boundary>
