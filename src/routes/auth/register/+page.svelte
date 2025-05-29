<script lang="ts">
    import { registerStore } from '$lib/stores/auth';
    import { ROUTES } from '$lib/constants/routes';

    $: nameError = $registerStore.validationErrors.find(err => err.path[0] === 'name')?.message;
    $: emailError = $registerStore.validationErrors.find(err => err.path[0] === 'email')?.message;
    $: passwordErrors = $registerStore.validationErrors.filter(err => err.path[0] === 'password');
    $: termsError = $registerStore.validationErrors.find(err => err.path[0] === 'termsAccepted')?.message;
</script>

<div class="auth-container">
    <div class="auth-left">
        <div class="logo">★</div>
        <h1>Добро пожаловать в<br><span class="brand">RLArena!</span></h1>
        <div class="illustration">
            <img src="/images/auth-illustration.svg" alt="Registration illustration" />
        </div>
    </div>

    <div class="auth-right">
        <div class="auth-form-container">
            <h2>Создайте свой аккаунт</h2>
            <p class="subtitle">Это просто и легко</p>

            <form on:submit|preventDefault={registerStore.handleRegister} class="auth-form">
                <div class="form-group">
                    <label for="name">ФИО</label>
                    <input
                        type="text"
                        id="name"
                        class:error={nameError}
                        value={$registerStore.name}
                        on:input={(e) => registerStore.setName(e.currentTarget.value)}
                        required
                        placeholder="Иванов Иван Иванович"
                        disabled={$registerStore.isLoading}
                    />
                    {#if nameError}
                        <span class="error-message">{nameError}</span>
                    {:else}
                        <span class="hint-message">
                            Введите ФИО в формате "Фамилия Имя" или "Фамилия Имя Отчество"
                        </span>
                    {/if}
                </div>

                <div class="form-group">
                    <label for="email">Электронная почта</label>
                    <input
                        type="email"
                        id="email"
                        class:error={emailError}
                        value={$registerStore.email}
                        on:input={(e) => registerStore.setEmail(e.currentTarget.value)}
                        required
                        placeholder="Введите ваш e-mail"
                        disabled={$registerStore.isLoading}
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
                        class:error={passwordErrors.length > 0}
                        value={$registerStore.password}
                        on:input={(e) => registerStore.setPassword(e.currentTarget.value)}
                        required
                        placeholder="Введите ваш пароль"
                        disabled={$registerStore.isLoading}
                    />
                    {#if passwordErrors.length > 0}
                        <div class="password-requirements">
                            {#each passwordErrors as error}
                                <div class="error-message">{error.message}</div>
                            {/each}
                        </div>
                    {/if}
                </div>

                {#if $registerStore.error}
                    <div class="error-message form-error">
                        {$registerStore.error}
                    </div>
                {/if}

                <div class="terms-group">
                    <label class="checkbox-label">
                        <input
                            type="checkbox"
                            class:error={termsError}
                            checked={$registerStore.termsAccepted}
                            on:change={(e) => registerStore.setTermsAccepted(e.currentTarget.checked)}
                            required
                        />
                        <span>
                            Создание учетной записи означает, что вы соглашаетесь с
                            <a href={ROUTES.LEGAL.TERMS} class="link">Правилами и условиями</a>, а также с нашей
                            <a href={ROUTES.LEGAL.PRIVACY} class="link">Политикой конфиденциальности</a>
                        </span>
                    </label>
                    {#if termsError}
                        <span class="error-message">{termsError}</span>
                    {/if}
                </div>

                <button 
                    type="submit" 
                    class="submit-button" 
                    disabled={$registerStore.isLoading || !$registerStore.termsAccepted}
                >
                    {$registerStore.isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
                </button>

                <p class="toggle-auth">
                    Уже есть аккаунт? <a href={ROUTES.AUTH.LOGIN} class="link">Войти</a>
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

    input[type="checkbox"].error {
        outline: 2px solid #e53e3e;
    }

    .error-message {
        color: #e53e3e;
        font-size: 0.875rem;
    }

    .hint-message {
        color: #718096;
        font-size: 0.875rem;
    }

    .form-error {
        text-align: center;
        padding: 0.5rem;
        background-color: #fff5f5;
        border-radius: 0.375rem;
        border: 1px solid #feb2b2;
    }

    .password-requirements {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .terms-group {
        font-size: 0.875rem;
        color: #4a5568;
    }

    .checkbox-label {
        display: flex;
        gap: 0.5rem;
        align-items: flex-start;
        line-height: 1.4;
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