<script>
  import { onMount } from 'svelte';
  import { Sprite } from './lib/models/Sprite';

  let context;

  const createAssets = () => {
    const canvas = document.querySelector('canvas');
    context = canvas.getContext('2d');
    context.fillRect(0, 0, 1024, 576);
    const player = new Sprite({
      x: 0,
      y: 0,
    }, context);
    player.draw();
    const enemy = new Sprite({
      x: 200,
      y: 100
    }, context);
    enemy.draw();
  };

  onMount(() => {
    createAssets();
  });
</script>

<main>
  <canvas></canvas>
</main>

<style>
  canvas {
    /* height: 36rem; */
    height: 576px;
    /* width: 64rem; */
    width: 1024px;
  }
</style>
