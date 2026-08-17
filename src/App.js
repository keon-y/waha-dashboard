import { Navigate } from "react-router-dom";
import { UserAuth } from './context/AuthContext'

function App() {
  const { session, loading } = UserAuth();
  console.log(session, loading)

  if (loading) {
    return <div>Carregando...</div>;
  }
  return (
    <Navigate to={session  ? '/dashboard' : '/login'}/>
  );
}

export default App;