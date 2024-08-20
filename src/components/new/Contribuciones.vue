<script setup>

</script>

<template>
    <section class="seccion-contribuyentes">
        <article class="mayorContribuyente seccion">
            <h3 class="titulo">Mayor Contribuyente</h3>
            <div class="info">
                <img src="../../assets/img/rayuela_logo.jpg" alt="imagen de usuario" class="img" >
                
                <p>Nombre de usuario</p>
                
            </div>
        </article>
        <article class="ultimoContribuyente seccion">
            <h3 class="titulo" >Último Contribuyente</h3>
            <div class="info">
                <img src="../../assets/img/rayuela_logo.jpg"  alt="imagen de usuario" class="img">
                
                <p>Nombre de usuario</p>
                
            </div>
        </article>
        
    </section>
</template>

<style scoped>
.seccion-contribuyentes{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 100px;
}

.seccion{
    padding: 15px;
}

.titulo{
    text-align:center;
    margin-bottom:10px;
}

.info{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    text-align: center;
    vertical-align: center;
}

.img{

    width: 80px;
    height: 80px;
    border: 1px solid black;
    border-radius: 50%;
}

</style>