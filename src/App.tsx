import { useEffect, useState } from "react";

type Name = {
  id: string;
  name: string;
  lastname: string;
}

function App() {
  const [names, setNames] = useState<Name[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/names');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setNames(result);
      } catch (err:any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <>
      {names && names.map((n: Name) => (
        <div key={n.id}>
          <a href={`http://localhost:4000/names/${n.id}`}>{n.name} {n.lastname}</a>
        </div>
      ))}
    </>
  )
}

export default App