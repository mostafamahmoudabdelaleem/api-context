# react-native-api-context

An react native context to manage all api calls in one place

## Installation

```sh
npm install react-native-api-context

yarn add react-native-api-context
```

## Usage

```js
// inside root App.tsx
import { APIContextProvider } from 'react-native-api-context';
import Page from './Page';

export default function App() {
	const BASE_URL = 'https://jsonplaceholder.typicode.com'

	return (
		<APIContextProvider BaseURL={BASE_URL}>
			<Page/>
		</APIContextProvider>
	);
}
```

```js
// inside any child component of APIContextProvider
import { APIContext } from 'react-native-api-context';

export default function Page() {
    const { Get } = React.useContext(APIContext)

    useEffect(() => {
        Get({
            path: 'posts'
        })
            .then(resp => {
                console.log('[APIContext resp]:', resp)
            })
            .catch(err => {
                console.log('[APIContext error]:', err)
            })
    }, []);

    return (
        ...
    );
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
