<script lang="ts">
    import { useSearchParams } from "runed/kit";
    import { navigating } from "$app/state";
    import * as z from "zod";
    import { getPosts } from "$lib/data.remote";

    const GetPostsQuery = z.object({
        page: z.coerce.number<number>().int().min(1).default(1),
        limit: z.coerce.number<number>().int().min(1).max(100).default(20),
    });

    const params = useSearchParams(GetPostsQuery);
    const page = $derived(params.page);
    const limit = $derived(params.limit);

    // This variant doesn't show the loading state of the remote function at all:
    // const { pagination, data } = $derived(await getPosts({ page, limit }));

    // This should behave the same, but instead it sends two requests,
    // and during the second one it shows the loading state.
    const posts = $derived(getPosts({ page, limit }));
    const { pagination, data } = $derived(await posts);
</script>

<div>
    <h2>Debug info</h2>
    <p>Number of promises inside boundary: {$effect.pending()}</p>
    <p>Current page: {params.page}</p>
    <p>Current limit: {limit}</p>
    <p>Remote function loading: {posts.loading}</p>
    <p>Navigating to: {navigating.to}</p>
</div>

<div class="">
    <h2>Posts</h2>
    <p>
        <strong>Loading (during page change or refetch)?</strong>
        {posts.loading}
    </p>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            {#each data as post (post.id)}
                <tr>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.date}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<div>
    <h2>Pagination:</h2>
    <label for="limit">Limit:</label>
    <input name="limit" type="number" bind:value={params.limit} min="1" />
    <button
        onclick={() => (params.page = params.page - 1)}
        disabled={posts.loading}>Previous</button
    >
    <p>Page {pagination.page} from total {pagination.totalPages}</p>
    <button
        onclick={() => (params.page = params.page + 1)}
        disabled={posts.loading}>Next</button
    >
</div>
