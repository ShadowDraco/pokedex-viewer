import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'

import { extendTheme } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ColorModeScript />
		<ChakraProvider>
			<App />
		</ChakraProvider>
	</React.StrictMode>
)
