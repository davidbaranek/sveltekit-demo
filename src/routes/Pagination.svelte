<script lang="ts">
    let {
        page = $bindable(),
        limit = $bindable(),
        totalPages,
        loading,
    }: {
        page: number;
        limit: number;
        totalPages: number;
        loading: boolean;
    } = $props();
</script>

<div>
    <h2>Pagination:</h2>
    <p>Loading: {loading}</p>
    <label for="limit">Limit:</label>
    <input name="limit" type="number" bind:value={limit} min="1" />
    <button onclick={() => (page = page - 1)} disabled={loading}
        >Previous</button
    >
    <p>Page {page} from total {totalPages}</p>
    <button onclick={() => (page = page + 1)} disabled={loading}>Next</button>
</div>
