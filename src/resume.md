# Guide d'Installation et de Configuration pour un Projet React

## Installation et Vérifications Préliminaires

| Étape                             | Commande                                  |
| --------------------------------- | ----------------------------------------- |
| **Vérifier si npm est installé**  | `npm -v`                                  |
| **Installer npm (et Node.js)**    | `sudo apt install nodejs npm`             |
| **Vérifier si Vite est installé** | `npm list -g vite`                        |
| **Installer Vite**                | `npm install -g vite`                     |
| **Installer les dépendances**     | `npm install`                             |

## Routage et Layout

### Installation de React Router

```bash
npm i react-router-dom

Configuration du Router

Importez les modules nécessaires depuis react-router-dom :

js

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';

Création du Router

js

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
    </Route>
  )
);

Gestion du Layout avec Outlet

L'élément Outlet permet de rendre dynamiques les sous-routes :

js

import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />       
    </>
  );
}

export default MainLayout;

Optimisation des Liens

Pour éviter les rechargements de page, utilisez Link à la place des balises <a> classiques :

js

import { Link, NavLink } from 'react-router-dom';

Modifiez les attributs href en to pour les liens, et utilisez NavLink pour gérer le focus sur la page courante.
Gestion des Icônes
Installation des Icônes

bash

npm i react-icons

Utilisation des Icônes

Importez et utilisez les icônes depuis le package react-icons :

js

import { FaXXX } from "react-icons/fa";

Remplacez les balises <i> par les icônes correspondantes, par exemple <FaXXX />.
Gestion des Erreurs 404

Créez une page pour gérer les erreurs 404 et ajoutez la route avec path="*" pour capturer toutes les autres routes non définies.
Astuces Diverses

    Utilisez isActive et prevState pour gérer l'état des composants.
    Formulaires React : Remplacez for par htmlFor dans les balises <label>.

Serveur JSON pour le Développement
Installation

bash

npm i -D json-server

Configuration dans Vite

Ajoutez la ligne suivante dans package.json :

json

"server": "json-server --watch src/jobs.json --port 8000"

Lancez le serveur avec la commande :

bash

npm run server

Récupération des Données

Utilisez useEffect pour récupérer les données depuis le serveur JSON :

js

useEffect(() => {
  const fetchJobs = async () => {
    try {
      const res = await fetch('http://localhost:8000/jobs');
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      console.log('Error fetching data');
    } finally {
      setLoading(false);
    }
  };
  fetchJobs();
}, []);

Récupération des Paramètres d'URL

Utilisez useParams pour récupérer l'ID d'une ressource :

js

import { useParams } from 'react-router-dom';

const JobPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        const data = await res.json();
        setJob(data);
      } catch (error) {
        console.log('Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  return loading ? <Spinner /> : <h1>{job.title}</h1>;
};

export default JobPage;

Ajout d'un Spinner de Chargement
Installation

bash

npm i react-spinners

Création du Composant Spinner

js

import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: 'block',
  margin: '100px auto'
};

const Spinner = ({ loading }) => {
  return (
    <ClipLoader
      color="#4338ca"
      loading={loading}
      cssOverride={override}
    />
  );
};

export default Spinner;

Configuration du Proxy avec Vite

Ajoutez cette configuration dans vite.config.js pour gérer les appels API avec un proxy :

js

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
});

Gestion des Données avec React
Traitement des Formulaires

js

const AddJobPage = ({ addJobSubmit }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Full-Time');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const newJob = {
    title,
    type,
    location,
    description,
    salary,
    company: {
      name: companyName,
      description: companyDescription,
      contactEmail,
      contactPhone,
    }
  };

  const handleSubmit = () => {
    addJobSubmit(newJob);
    navigate('/jobs');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form Fields */}
    </form>
  );
};

export default AddJobPage;

Gestion de la Requête POST

Ajoutez la méthode POST dans votre application :

js

const addJob = async (newJob) => {
  await fetch('/api/jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newJob),
  });
};

Ajoutez la route dans App.js :

js

<Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />

Notifications avec React Toastify
Installation

bash

npm i react-toastify

Utilisation

js

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => (
  <>
    <ToastContainer />
    {/* Other components */}
  </>
);

// Exemple d'utilisation
toast.success('Message de succès');

Compilation en Production

Pour générer une version de production :

bash

npm run build