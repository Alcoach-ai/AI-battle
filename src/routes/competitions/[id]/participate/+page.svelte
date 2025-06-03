<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import {
    getContest,
    getContestSubmissions,
    isUserEntered,
    enterContest,
    submitSolution
  } from '$lib/api/contestApi';

  let competition: any = null;
  let loading = true;
  let error = '';
  let file: File | null = null;
  let uploadStatus = '';
  let submissions: any[] = [];
  let isEntered = false;
  let status: string = '';
  let comment = '';

  async function fetchAll(slug: string) {
    loading = true;
    error = '';
    try {
      competition = await getContest(slug);
      status = competition.status;
      isEntered = (await isUserEntered(slug)).is_entered;
      if (isEntered) {
        submissions = (await getContestSubmissions(slug)).submissions || [];
      } else {
        submissions = [];
      }
    } catch (e: any) {
      error = e.message || 'Ошибка загрузки данных';
    } finally {
      loading = false;
    }
  }

  onMount(async () => {
    const slug = $page.params.id;
    await fetchAll(slug);
  });

  async function handleFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      file = input.files[0];
    }
  }

  async function handleRegister() {
    uploadStatus = '';
    try {
      const slug = $page.params.id;
      await enterContest(slug);
      isEntered = true;
      await fetchAll(slug);
    } catch (e: any) {
      uploadStatus = e.message || 'Ошибка регистрации';
    }
  }

  async function handleUpload() {
    if (!file) {
      uploadStatus = 'Выберите файл для загрузки';
      return;
    }
    uploadStatus = 'Загрузка...';
    try {
      const slug = $page.params.id;
      await submitSolution(slug, file, comment);
      uploadStatus = 'Файл успешно загружен!';
      await fetchAll(slug);
    } catch (e: any) {
      uploadStatus = e.message || 'Ошибка загрузки файла';
    }
  }
</script>

{#if loading}
  <div class="loading">Загрузка...</div>
{:else if error}
  <div class="error">{error}</div>
{:else if !competition}
  <div class="error">Соревнование не найдено</div>
{:else}
  <div class="participate-page">
    <h1>{competition.title}</h1>
    <section class="description">
      <h2>Описание задания</h2>
      <p>{competition.description}</p>
      <div class="status">Статус: <b>{status}</b></div>
    </section>
    {#if !isEntered}
      <section class="register-section">
        <button on:click={handleRegister} class="register-btn">Зарегистрироваться на соревнование</button>
        {#if uploadStatus}
          <div class="upload-status">{uploadStatus}</div>
        {/if}
      </section>
    {:else if status === 'active'}
      <section class="upload-section">
        <h2>Загрузить файл с ответом</h2>
        <input type="file" on:change={handleFileChange} />
        <input type="text" placeholder="Комментарий (необязательно)" bind:value={comment} />
        <button on:click={handleUpload}>Отправить</button>
        {#if uploadStatus}
          <div class="upload-status">{uploadStatus}</div>
        {/if}
      </section>
    {/if}
    {#if isEntered}
      <section class="participants-section">
        <h2>Ваши отправленные решения</h2>
        {#if submissions.length === 0}
          <div>Нет отправленных решений</div>
        {:else}
          <table>
            <thead>
              <tr>
                <th>Дата</th>
                <th>Результат</th>
                <th>Комментарий</th>
              </tr>
            </thead>
            <tbody>
              {#each submissions as s}
                <tr>
                  <td>{s.created_at}</td>
                  <td>{s.score ?? '-'}</td>
                  <td>{s.comment ?? '-'}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        {/if}
      </section>
    {/if}
    {#if status === 'ended'}
      <div class="ended-msg">Соревнование завершено. Отправка решений закрыта.</div>
    {/if}
    {#if status === 'upcoming'}
      <div class="upcoming-msg">Соревнование ещё не началось.</div>
    {/if}
  </div>
{/if}

<style>
.participate-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}
.description {
  margin-bottom: 2rem;
}
.status {
  margin-top: 1rem;
  color: #4a5568;
}
.upload-section, .register-section {
  margin-bottom: 2rem;
}
.upload-status {
  margin-top: 1rem;
  color: #4299e1;
}
.participants-section table {
  width: 100%;
  border-collapse: collapse;
}
.participants-section th, .participants-section td {
  border: 1px solid #e2e8f0;
  padding: 0.5rem 1rem;
  text-align: left;
}
.participants-section th {
  background: #f7fafc;
}
.ended-msg, .upcoming-msg {
  margin-top: 2rem;
  color: #e53e3e;
  font-weight: bold;
}
.register-btn {
  padding: 0.75rem 2rem;
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
}
.register-btn:hover {
  background: #3182ce;
}
</style> 