import { useState } from 'react';
import './App.css';
// Alphanet SDK Imports
import {
  StateApi,
  TransactionApi,
  StatusApi,
} from '@radixdlt/alphanet-gateway-api-v0-sdk';
import Sdk, { ManifestBuilder } from '@radixdlt/alphanet-walletextension-sdk';

function App() {
  const [resourceAddress, setResourceAddress] = useState('');
  const [fetchResults, setFetchResults] = useState(null);
  const [sdkResults, setSdkResults] = useState(null);
  const [accountAddress, setAccountAddress] = useState('');

  // Initialize the SDK
  const sdk = Sdk();
  // Initialize Gateway API SDKs
  const transactionApi = new TransactionApi();
  const stateApi = new StateApi();
  const statusApi = new StatusApi();

  // Use Wallet SDK to get current account address
  const sdkWalletAddress = async () => {
    const result = await sdk.request({
      accountAddresses: {},
    });

    if (result.isErr()) {
      throw result.error;
    }

    const { accountAddresses } = result.value;
    console.log('accountAddresses', accountAddresses);
    setAccountAddress(accountAddresses[0].address);
  };

  // use SDK to fetch component or account(accounts are also components) state from ledger
  const sdkComponentState = async (e) => {
    e.preventDefault();
    console.log('Getting State via SDK');

    // Fetch the state of a component
    const account_state = await stateApi.stateComponentPost({
      v0StateComponentRequest: { component_address: accountAddress },
    });
    if (account_state) {
      console.log('sdk account_state: ', account_state);
      setSdkResults(account_state);
    }
  };

  // Get component state using Javascript fetch
  const fetchComponentState = async (e) => {
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
      {/* get connected account */}
      <button onClick={sdkWalletAddress}>Get Connected Account</button>
      <p>Connected Wallet Account Address: {accountAddress}</p>

      {/* fetch gateway api account / component form */}
      <form onSubmit={fetchComponentState}>
        <label>
          <span>Component/Account Address:</span>
          <input
            required
            type="text"
            onChange={(e) => setResourceAddress(e.target.value)}
            value={resourceAddress}
          />
        </label>

        <button type="submit">Fetch API Component Data</button>
        <hr />
      </form>

      {/* sdK account / component form */}
      <form onSubmit={sdkComponentState}>
        <label>
          <span>Component/Account Address:</span>
          <input
            required
            type="text"
            onChange={(e) => setResourceAddress(e.target.value)}
            value={resourceAddress}
          />
        </label>

        <button type="submit">Get SDK Component Data</button>
        <hr />
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
