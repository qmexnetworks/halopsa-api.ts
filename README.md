# halopsa-api.ts

A TypeScript/Deno implementation of (parts of) the HaloPSA API

## Examples

### Get all Assets for a single client

```typescript
// Instantiate the HaloPSA API client
const halopsa = new HaloPSA("https://company.halopsa.com", "my-jwt-api-token");

// Fetch all clients (this automatically takes care of pagination)
const clients = await halopsa.clients();

// Select some client
const myFavoriteClient = clients[0];

// Load all assets for this client
const assets = halopsa.assets(myFavoriteClient.id);
```
