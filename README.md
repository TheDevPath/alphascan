# Welcome to Alphanet!

Let's Build Alphascan so that we have an easy way to inspect our scrypto components, resources, and accounts.

## Project outline

- Create a simple interface to fetch ledger state for accounts, resources and blueprint packages and components.
- Display results in a reasonably human readable format
- Show how to fetch api endpoints
- Correlate api endpoints with SDK methods
- Build and deploy a few blueprints and components for testings

### Available API Endpoints

#### Status Endpoint

- https://alphanet.radixdlt.com/v0/status/network-configuration

#### Transaction Endpoints

- https://alphanet.radixdlt.com/v0/transaction/submit
- https://alphanet.radixdlt.com/v0/transaction/status
- https://alphanet.radixdlt.com/v0/transaction/receipt

#### Ledger State Endpoints

- https://alphanet.radixdlt.com/v0/state/epoch
- https://alphanet.radixdlt.com/v0/state/component
- https://alphanet.radixdlt.com/v0/state/resource
- https://alphanet.radixdlt.com/v0/state/non-fungible
- https://alphanet.radixdlt.com/v0/state/package

### Useful Resources

[Alphanet API Docs](https://docs.radixdlt.com/main/scrypto/alphanet/api.html)

[JS SDK Docs](https://docs.radixdlt.com/main/scrypto/alphanet/javascript-sdk.html)

[Alphanet v0 API spec](https://redocly.github.io/redoc/?url=https://raw.githubusercontent.com/radixdlt/babylon-alphanet/main/gateway-api-v0/gateway-api-v0-schema.yaml)
