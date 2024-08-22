import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout'
import JobPages from './pages/JobPages';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, {jobLoader} from './pages/JobPage'
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';


const App = () => {
//Add New Job
  const addJob = async (newJob) => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers:{
        'Content-Type':'application/json'

      },
      body: JSON.stringify(newJob),
    });
    return;
  };

  //Delete Job
  const deleteJob = async(id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE'
    });
    return;
  };

  const editJoby = async (editedJob) => {
    const res = await fetch(`/api/jobs/${editedJob.id}`, {
      method: 'PUT',
      headers:{
        'Content-Type':'application/json'

      },
      body: JSON.stringify(editedJob),
    });
    return;
  };
   
  
  const router =  createBrowserRouter(
    createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path='/jobs' element={<JobPages />}/>
      <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob}/>} />
      {/* <Route path='/jobs/:id' element={<JobPage />} /> */}
      <Route path='/jobs/:id' element={<JobPage deleteJob = {deleteJob}/>} loader = {jobLoader}/>
      <Route path='/edit-job/:id' element={<EditJobPage editJob= {editJoby} />} loader = {jobLoader}/>
      <Route path='*' element={<NotFoundPage />}/>
    </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;