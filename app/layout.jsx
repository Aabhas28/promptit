import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import { Children } from 'react';

export const metadata = {
    title: 'PromptIT',
    description: 'Discover & Share AI Prompts'
}

const Rootlayout = ({children}) => {
  return (
    <html lang='en'>
    <body>
    <Provider>
    <div className="main">
    <div className="gradient" />
    </div>
        <main className="app">
        <Nav />
      {children}
        </main>
        </Provider>
    </body>

    </html>
  );
}

export default Rootlayout
