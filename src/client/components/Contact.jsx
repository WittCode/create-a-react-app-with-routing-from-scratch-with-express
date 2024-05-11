import useFetch from '../hooks/useFetch';

export default function Contact() {
  const data = useFetch('/api/contact');
  return (
    <>
      <h1>Conasdfasdfsdatact</h1>
      <h2>API data: {data}</h2>
    </>
  );
}