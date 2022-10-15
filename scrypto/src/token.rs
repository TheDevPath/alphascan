use scrypto::prelude::*;

blueprint! {
 struct ScryptoToken {
  scrypto_vault: Vault,
 }

 impl ScryptoToken {
   pub fn instantiate_scrypto_token() -> ComponentAddress {
    let scrypto_token: Bucket = ResourceBuilder::new_fungible()
         .divisibility(DIVISIBILITY_MAXIMUM)
         .metadata("name", "Scrypto Token")
         .metadata("symbol", "SCRYPTO")
         .initial_supply(1000);

     Self {
      scrypto_vault: Vault::with_bucket(scrypto_token),
     }
     .instantiate()
     .globalize()
   }

   pub fn free_token(&mut self) -> Bucket {
    self.scrypto_vault.take(1)
   }
 }
}
