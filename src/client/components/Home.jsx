import useFetch from '../hooks/useFetch';

export default function Home() {
  const data = useFetch('/api/home');
  return (
    <>
      <h1>Home</h1>
      <h2>API data: {data}</h2>
    </>
  );
}