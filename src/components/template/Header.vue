<template>
    <header class="header">                
        <h1 class="title">
            <router-link to="/">{{ title }}</router-link>
        </h1>        
    </header>
</template>

<script>


export default {
    name: 'Header',    
     props: {
         title: String,        
         
    }}
</script>

<style>
    .header {
        grid-area: header;
        background: linear-gradient(to right, #0e864e, #40dfc4);
        
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title {
        font-size: 1.2rem;
        color: #fff;
        font-weight: 100;
        flex-grow: 1;
        text-align: center;
    }

    .title a {
        color: #FFF;
        text-decoration: none;
    }

    .title a:hover {
        color: #FFF;
        text-decoration: none;
    }

    header.header > a.toggle {
        width: 60px;
        height: 100%;
        color: #fff;
        justify-self: flex-start;
        text-decoration: none;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    header.header > a.toggle:hover {
        color: #fff;
        background-color: rgba(0, 0, 0, 0.2);
    }
</style>
