# @nepse-helper/core

A helper library built as API wrapper for nepse data

## Usage

```ts
const nepse = await NepseBuilder.build();

const todayPrice = await nepse.getTodayPrice();

const gbime = await nepse.getSecurityDetail("GBIME");
```

## Issues

You might need to add `NODE_TLS_REJECT_UNAUTHORIZED=0` to env variables to avoid SSL errors.
