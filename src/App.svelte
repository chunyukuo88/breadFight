<script>
  import { onMount } from 'svelte';

  let context;

  onMount(() => {
    const canvas = document.querySelector('canvas');
    context = canvas.getContext('2d');
  });
</script>

<main>
  <canvas></canvas>
</main>

<style>
  canvas {
    height: 36rem;
    width: 64rem;
  }
</style>
