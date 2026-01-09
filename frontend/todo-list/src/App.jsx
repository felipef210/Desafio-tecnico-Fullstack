import { useState, useEffect } from 'react'
import './App.css';
import Task from './components/Task/Task';
import TaskForm from './components/TaskForm/TaskForm';
import * as taskService from './services/taskService';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [titleSearch, setTitleSearch] = useState('');
  const [order, setOrder] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedEditingTask, setSelectedEditingTask] = useState(null);
  const [feedback, setFeedback] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    let result = [...tasks];

    if (titleSearch) {
      result = result.filter(task =>
        task.title.toLowerCase().includes(titleSearch.toLowerCase())
      );
    }

    if (order === 'alfabetica') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (order === 'antigo') {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    if (order === 'recente') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredTasks(result);
  }, [tasks, titleSearch, order]);

  const showFeedback = (message, severity = 'success') => {
    setFeedback({
      open: true,
      message,
      severity,
    });
  };

  const loadTasks = async () => {
    try {
      const data = await taskService.getTasks();
      setTasks(data);
      setFilteredTasks(data);
    } 
    
    catch (error) {
      showFeedback(error.message, 'error');
    } 
  };

  const addTask = async (title, description) => {
    try {
      await taskService.createTask(title, description);
      showFeedback('Tarefa adicionada com sucesso!', 'success');
      loadTasks();
    } 

    catch (error) {
      showFeedback(error.message, 'error');
    }
  };

  const updateTaskStatus = async (id) => {
    try {
      await taskService.updateTaskStatus(id);
      setSelectedEditingTask(null);
      showFeedback('Status da tarefa atualizado com sucesso!', 'success');
      loadTasks();
    } 

    catch (error) {
      showFeedback(error.message, 'error');
    }
  };

  const callUpdateTask = async (task) => {
    try {
      await taskService.updateTask(task.id, task.title, task.description);
      showFeedback('Tarefa atualizada com sucesso!', 'success');
      loadTasks();
    }

    catch (error) {
      showFeedback(error.message, 'error');
    }
  };

  const callDeleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      showFeedback('Tarefa deletada com sucesso!', 'success');
      loadTasks();
    }

    catch (error) {
      showFeedback(error.message, 'error');
    }
  };
  
  return (
    <>
      <div className="app">
        <h1>Lista de tarefas</h1>
        <h3>
          {tasks.filter(t => t.completed).length} de {tasks.length} {tasks.length === 1 ? 'tarefa' : 'tarefas'} 
          {tasks.filter(t => t.completed).length === 1 || tasks.length === 1 ? ' concluída' : ' concluídas'}
        </h3>

        <div className={`form-wrapper ${showForm ? 'show' : 'hide'}`}>
          <TaskForm
            addTask={addTask}
            updateTask={callUpdateTask}
            editingTask={selectedEditingTask}
            cancelEdit={() => {
              setSelectedEditingTask(null);
              setShowForm(false);
            }}
          />
        </div>

        {
          !showForm && <button className="btnAdicionarTarefa" onClick={() => setShowForm(true)}>+ Adicionar tarefa</button>
        }

        <div className="filter">
          <input onChange={(e) => setTitleSearch(e.target.value)} type="search" className="filter__search" placeholder="Pesquise pelo título da tarefa..."/>
          <label>Ordenar por:</label>

          <select className="filter__order" onChange={(e) => setOrder(e.target.value)}>
            <option value="">Selecione uma opção...</option>
            <option value="alfabetica">Ordem alfabética</option>
            <option value="antigo">Mais antigo</option>
            <option value="recente">Mais recente</option>
          </select>
        </div>

        <div className="todo-list">
          <AnimatePresence>
            {filteredTasks.map(task => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <Task
                  task={task}
                  updateTaskStatus={updateTaskStatus}
                  onEdit={() => {setSelectedEditingTask(task); setShowForm(true);}}
                  onDelete={callDeleteTask}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <Snackbar
        open={feedback.open}
        autoHideDuration={3000}
        onClose={() => setFeedback({ ...feedback, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setFeedback({ ...feedback, open: false })}
          severity={feedback.severity}
          variant="filled"
        >
          {feedback.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App
