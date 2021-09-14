import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "antd/dist/antd.css";
import App from "next/app";
function MyApp({ Component, pageProps }: any) {
  return <Component {...pageProps} />
}

MyApp.getInitialProps = async (appContext: any) => {
	// calls page's `getInitialProps` and fills `appProps.pageProps`
	const appProps = await App.getInitialProps(appContext);
	const { ctx, router } = appContext;

	let routeStartsWith;
	const pathname = router?.pathname;
	console.log({ pathname });
  routeStartsWith = pathname;
  appProps.pageProps.isAdminRoute = routeStartsWith;
  return { ...appProps };
};

export default MyApp
