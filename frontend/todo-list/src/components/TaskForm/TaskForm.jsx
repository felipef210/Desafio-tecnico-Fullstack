import { useState, useEffect } from 'react';
import './TaskForm.css';

const TaskForm = ({ addTask, editingTask, cancelEdit, updateTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState({ title: '', description: '' });

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } 
    
    else {
      setTitle('');
      setDescription('');
    }
  }, [editingTask]);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const newErrors = {
      title: '',
      description: ''
    };

    if (!title.trim()) {
      newErrors.title = 'O título da tarefa é obrigatório';
    }

    if (!description.trim()) {
      newErrors.description = 'A descrição da tarefa é obrigatória';
    }

    setErrorMessage(newErrors);

    if (newErrors.title || newErrors.description)
      return;

    if (editingTask)
      updateTask({id: editingTask.id, title, description});

    else
      addTask(title, description);

    setTitle('');
    setDescription('');
    cancelEdit();
  }

  return (
    <div>
        <form className="form" onSubmit={ handleSubmit }>
          <h2 className="form__h2">{ editingTask ? 'Editar tarefa' : 'Criar nova tarefa' }</h2>

          <div className="field">
            <label>Título: </label>

            <div className="form__field">
              <input
                placeholder="Digite o título..."
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {
                errorMessage.title && (
                  <p className="form__error">{errorMessage.title}</p>
                )
              }
            </div>
          </div>
          
          <div className="field">
            <label>Descrição: </label>

            <div className="form__field">
              <textarea
                  placeholder="Digite a descrição..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              {
                errorMessage.description && (
                  <p className="form__error">{errorMessage.description}</p>
                )
              }
            </div>
          </div>
          
          <div className="form__actions">
            <button type="submit" className="actions__primary-btn">{ editingTask ? 'Salvar alterações' : 'Criar tarefa' }</button>
            <button type="button" className="actions__cancel-btn" onClick={cancelEdit}>Cancelar</button>
          </div>
        </form>
    </div>
  )
}

export default TaskForm
