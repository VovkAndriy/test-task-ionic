import { IonApp, setupIonicReact } from "@ionic/react";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import AppRouter from "./navigation/AppRouter";

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
setupIonicReact();

const httpLink = createHttpLink({
    uri: "https://api-test.dropon.io/graphql",
});
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = "pZt9g8w4R7vedGHwSliuPZg2SC13ZzF3TSRnRmCLd9fyfp1q72";
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            Authorization: token ? `${token}` : "",
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

const App: React.FC = () => (
    <IonApp>
        <ApolloProvider client={client}>
            <AppRouter />
        </ApolloProvider>
    </IonApp>
);

export default App;
