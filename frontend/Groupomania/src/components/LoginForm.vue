<template>
    <div class="login">
        <nav><router-link to="/signup" class="active">Inscrire</router-link> | <router-link to="/login">Connecter</router-link></nav>
        <form>
            <label for="login-email">Email :</label>
            <input id="login-email" type="text" placeholder="Email" required>
            
            <label for="login-password">Mot de passe :</label>
            <input id="login-password" type="password" placeholder="Mot de passe" required>

            <div class="error-message">{{message}}</div>

            <button id="login-btn" type="submit">Connexion</button>

            
        </form>
    </div>
</template>

<script>

</script>

<style scoped>
    .login{
        max-width: 500px;
        margin: 90px auto;
    }

    img{
        width: 100%;
    }

    nav{
        font-size: 1.05rem;
        margin: 20px;
    }

    .active{
        color: #0e213f;
        font-weight: bold;
    }

    form{
        display: flex;
        flex-direction: column;
    }

    form label{
        color: rgba(53, 53, 53, 0.664);
        margin: 10px;
    }

    form input{
        font-size: 1.05rem;
        padding: 10px;
        margin-bottom: 15px;
        text-align: center;
    }

    #login-btn{
        padding: 10px;
        font-size: 1.1rem;
        color: white;
        background-color: rgb(83, 80, 80);
        border: none;
        border-radius: 10px;
        transition-duration: 0.2s;
        cursor: pointer;
    }

    #login-btn:hover{
        transform: scale(1.025);
    }

    .error-message{
        background-color: rgba(255, 0, 0, 0.301);
    }

    label{
        font-size: 0.8rem;
        font-weight: bold;
        color: rgb(109, 109, 109);
        text-align: left;
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
    }
    
</style>