import { useEffect, useState } from "react";

interface Data {
  id: string;
  name: string;
  lastname: string;
}

function App() {
  const [names, setNames] = useState<Data[]>();
  const [loading, setLoading] = useState(true);
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
      {names && names.map((n: Data) => (
        <div key={n.id}>
          <p>{n.name} {n.lastname} | id: {n.id}</p>
        </div>
      ))}
    </>
  )
}

export default App