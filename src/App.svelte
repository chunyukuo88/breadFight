<script>
  import { onMount } from 'svelte';

  let context;

  onMount(() => {
    const canvas = document.querySelector('canvas');
    context = canvas.getContext('2d');
  });
</script>

<main>
  <p>wozzle</p>
  <canvas></canvas>
  <p>mizzle</p>
</main>

<style>
  canvas {
    height: 576px;
    width: 1024px;
  }
</style>
