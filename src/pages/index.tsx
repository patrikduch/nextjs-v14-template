import { GetServerSideProps } from 'next';
import { initializeStore, fetchApiData, State } from '../store/store';

export const getServerSideProps: GetServerSideProps = async () => {
  // Create an empty store
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;

  // Dispatch the fetchApiData action to fetch data within Redux
  await dispatch(fetchApiData());

  // Pass the initial state of the store to props
  return { props: { initialReduxState: reduxStore.getState() } };
};

interface IProps {
  initialReduxState: State
}

 const HomePage: React.FC<IProps> = ({ initialReduxState }) => {
  return (
    <div>
      <h1>Redux State:</h1>
      <pre>{JSON.stringify(initialReduxState, null, 2)}</pre>
    </div>
  );
}

export default HomePage;
