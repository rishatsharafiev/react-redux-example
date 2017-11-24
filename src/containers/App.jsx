import React from 'react';

import 'styles/index';
import Hello from 'containers/Hello';

const App = () => (
  <div>
    <h1>App</h1>
    <Hello progress={50} />
  </div>
);

export default App;
