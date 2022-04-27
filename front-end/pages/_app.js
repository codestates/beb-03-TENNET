import { DefaultSeo } from 'next-seo';

import 'styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo
        titleTemplate='%s'
        title='TENET | Vivamus, moriendum est'
        description={`Our Blockchain Project`}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
