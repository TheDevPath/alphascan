import { useState } from 'react';

import './App.css';

function App() {
  const [resourceAddress, setResourceAddress] = useState('');
  const [fetchResults, setFetchResults] = useState(null);
  const [sdkResults, setSdkResults] = useState(null);

  const fetchCompoentState = async (e) => {
    e.preventDefault();
    console.log('fetching ledger state');
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      component_address: resourceAddress,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://alphanet.radixdlt.com/v0/state/component', requestOptions)
      .then((result) => result.json())
      .then((data) => setFetchResults(data))
      .catch((error) => console.log('error', error));
  };
  if (fetchResults) {
    console.log('fetchResults: ', fetchResults);
    console.log('fetchResults info: ', fetchResults.info);
    console.log('fetchResults state: ', fetchResults.state);
    console.log('fetchResults owned_vaults: ', fetchResults.owned_vaults);
    console.log('fetchResults desc_ids: ', fetchResults.descendant_ids);
  }

  return (
    <div className="App">
      <form onSubmit={fetchCompoentState}>
        <label>
          <span>Resource Address:</span>
          <input
            required
            type="text"
            onChange={(e) => setResourceAddress(e.target.value)}
            value={resourceAddress}
          />
        </label>
        <hr />
        <button type="submit">Get Resource Data</button>
      </form>

      <div className="results">{}</div>
      <a
        className="App-link"
        href="https://youtube.com/playlist?list=PL4EVBVoyp_YCzFkrH6ziVT70wuh0o-lCW"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn Scrypto
      </a>
    </div>
  );
}

export default App;
