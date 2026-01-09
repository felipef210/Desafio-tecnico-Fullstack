import { Task } from '../types/Task';

const API_URL = 'http://localhost:3000/tasks';

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Erro ao buscar tarefas');
  }
  return response.json();
}

export async function createTask(title: string, description: string): Promise<Task> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, description })
  });

  if (!response.ok) {
      let message = 'Erro ao atualizar status da tarefa';

      try {
        const errorBody = await response.json();

        if (errorBody?.message === 'Tarefa não encontrada') {
          message = errorBody.message;
        }
      } 
      catch {
        
      }

      throw new Error(message);
    }

  return response.json();
}

export async function updateTaskStatus(id: number): Promise<Task> {
    const response = await fetch(`${API_URL}/${id}`, {method: 'PATCH'});

    if (!response.ok) {
      let message = 'Erro ao atualizar status da tarefa';

      try {
        const errorBody = await response.json();

        if (errorBody?.message === 'Tarefa não encontrada') {
          message = errorBody.message;
        }
      } 
      catch {
        
      }

      throw new Error(message);
    }

    return response.json();
}

export async function updateTask(id: number, title: string, description: string): Promise<Task> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
    });

    if (!response.ok) {
      let message = 'Erro ao atualizar tarefa';

      try {
        const errorBody = await response.json();

        if (errorBody?.message === 'Tarefa não encontrada') {
          message = errorBody.message;
        }
      } 
      catch {
        
      }

      throw new Error(message);
    }

    return response.json();
}

export async function deleteTask(id: number): Promise<boolean> {
    const response = await fetch(`${API_URL}/${id}`, {method: 'DELETE'});

    if (!response.ok) {
      let message = 'Erro ao deletar tarefa';

      try {
        const errorBody = await response.json();

        if (errorBody?.message === 'Tarefa não encontrada') {
          message = errorBody.message;
        }
      } 
      catch {
        
      }

      throw new Error(message);
    }

    return true;
}