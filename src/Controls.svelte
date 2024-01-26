<script lang="ts">

</script>

<div id="controls">
    <div id="controls__game-title">Escape From Karl Road</div>

    <fieldset>
        <legend>Picking up or dropping off?</legend>
        <div>
            <input name="transit" id="dropping-off" type="radio" checked>
            <label for="dropping-off"></label>
        </div>
        <div>
            <input name="transit" id="picking-up" type="radio">
            <label for="picking-up"></label>
        </div>
    </fieldset>
</div>


<style>
    #controls {
        background-color: red;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 100%;
        padding: 0;
    }

    #controls__game-title {
        background-color: blue;
        color: white;
        padding: 0.5rem;
    }
</style>