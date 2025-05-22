<script lang="ts">
    import { authStore } from '$lib/stores/auth';
    import { ROUTES } from '$lib/constants/routes';

    $: emailError = $authStore.validationErrors.find(err => err.path[0] === 'email')?.message;
    $: passwordError = $authStore.validationErrors.find(err => err.path[0] === 'password')?.message;
</script>

<div class="auth-container">
    <div class="auth-left">
        <div class="logo">★</div>
        <h1>С возвращением в<br><span class="brand">RLArena!</span></h1>
        <div class="illustration">
            <img src="/images/auth-illustration.svg" alt="Login illustration" />
        </div>
    </div>

    <div class="auth-right">
        <div class="auth-form-container">
            <h2>Войдите в аккаунт</h2>
            <p class="subtitle">Рады видеть вас снова</p>

            <form on:submit|preventDefault={authStore.handleLogin} class="auth-form">
                <div class="form-group">
                    <label for="email">Электронная почта</label>
                    <input
                        type="email"
                        id="email"
                        class:error={emailError}
                        value={$authStore.email}
                        on:input={(e) => authStore.setEmail(e.currentTarget.value)}
                        required
                        placeholder="Введите ваш e-mail"
                        disabled={$authStore.isLoading}
                    />
                    {#if emailError}
                        <span class="error-message">{emailError}</span>
                    {/if}
                </div>

                <div class="form-group">
                    <label for="password">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        class:error={passwordError}
                        value={$authStore.password}
                        on:input={(e) => authStore.setPassword(e.currentTarget.value)}
                        required
                        placeholder="Введите ваш пароль"
                        disabled={$authStore.isLoading}
                    />
                    {#if passwordError}
                        <span class="error-message">{passwordError}</span>
                    {/if}
                    <a href={ROUTES.AUTH.RESET_PASSWORD} class="forgot-password">Забыли пароль?</a>
                </div>

                {#if $authStore.error}
                    <div class="error-message form-error">
                        {$authStore.error}
                    </div>
                {/if}

                <button 
                    type="submit" 
                    class="submit-button" 
                    disabled={$authStore.isLoading}
                >
                    {$authStore.isLoading ? 'Загрузка...' : 'Войти'}
                </button>

                <p class="toggle-auth">
                    Нет аккаунта? <a href={ROUTES.AUTH.REGISTER} class="link">Зарегистрироваться</a>
                </p>
            </form>
        </div>
    </div>
</div>

<style>
    .auth-container {
        display: flex;
        min-height: 100vh;
    }

    .auth-left {
        flex: 1;
        background-color: #EBF3FF;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .logo {
        font-size: 1.5rem;
        background: white;
        width: 3rem;
        height: 3rem;
        border-radius: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 2rem;
    }

    .brand {
        color: #4299e1;
    }

    h1 {
        font-size: 2.5rem;
        text-align: center;
        margin-bottom: 2rem;
        line-height: 1.2;
    }

    .illustration {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 400px;
        margin: 0 auto;
    }

    .auth-right {
        flex: 1;
        padding: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .auth-form-container {
        width: 100%;
        max-width: 480px;
        padding: 2rem;
    }

    h2 {
        font-size: 2rem;
        margin-bottom: 0.5rem;
        color: #1a202c;
    }

    .subtitle {
        color: #718096;
        margin-bottom: 2rem;
    }

    .auth-form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    label {
        font-weight: 500;
        color: #4a5568;
    }

    input {
        padding: 0.75rem;
        border: 1px solid #e2e8f0;
        border-radius: 0.375rem;
        font-size: 1rem;
        background-color: #f7fafc;
        transition: all 0.2s;
    }

    input:focus {
        outline: none;
        border-color: #4299e1;
        background-color: white;
    }

    input.error {
        border-color: #e53e3e;
        background-color: #fff5f5;
    }

    .error-message {
        color: #e53e3e;
        font-size: 0.875rem;
    }

    .form-error {
        text-align: center;
        padding: 0.5rem;
        background-color: #fff5f5;
        border-radius: 0.375rem;
        border: 1px solid #feb2b2;
    }

    .forgot-password {
        align-self: flex-end;
        font-size: 0.875rem;
        color: #4299e1;
        text-decoration: none;
    }

    .forgot-password:hover {
        text-decoration: underline;
    }

    .link {
        color: #4299e1;
        text-decoration: none;
    }

    .link:hover {
        text-decoration: underline;
    }

    .submit-button {
        background-color: #4299e1;
        color: white;
        padding: 0.75rem;
        border: none;
        border-radius: 0.375rem;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .submit-button:hover:not(:disabled) {
        background-color: #3182ce;
    }

    .submit-button:disabled {
        background-color: #a0aec0;
        cursor: not-allowed;
    }

    .toggle-auth {
        text-align: center;
        color: #4a5568;
    }

    @media (max-width: 768px) {
        .auth-container {
            flex-direction: column;
        }

        .auth-left {
            padding: 1rem;
        }

        .illustration {
            display: none;
        }

        .auth-right {
            padding: 1rem;
        }

        .auth-form-container {
            padding: 1rem;
        }
    }
</style> 