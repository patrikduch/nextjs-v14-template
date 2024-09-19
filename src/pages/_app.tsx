// pages/_app.tsx
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { useStore } from '../store/store';

export default function App({ Component, pageProps }: AppProps) {
  // Restore the state created by `getServerSideProps`
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}