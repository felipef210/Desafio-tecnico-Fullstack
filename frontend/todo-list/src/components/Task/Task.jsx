import './Task.css';

const Task = ({ task, updateTaskStatus, onEdit, onDelete }) => {

  function formatDate(dateString) {
    return new Date(dateString).toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo'
    });
  }

  return (
    <div className={`task ${task.completed ? 'completed' : ''}`}>
        <div className="task__content">
          <p className={`content__title ${task.completed ? 'completed' : ''}`}>{ task.title }</p>
          <p className={`content__description ${task.completed ? 'completed' : ''}`}>{ task.description }</p>
          <p className={task.completed ? 'completed' : ''}>Criada em: {formatDate(task.createdAt)}</p>
        </div>

        <div className="task__actions">
          <button className="actions__edit" onClick={onEdit}></button>
          <button className="actions__delete" onClick={() => onDelete(task.id)}></button>
          <button className={`actions__complete ${task.completed ? 'completed' : ''}`} onClick={() => updateTaskStatus(task.id)}></button>
        </div>
    </div>
  )
}

export default Task
