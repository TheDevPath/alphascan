use scrypto::prelude::*;

#[derive(NonFungibleData)]
pub struct Ticket {
    pub row: u32,
    pub column: u32,
}

blueprint! {
 struct ScryptoNFT {
  available_tickets: Vault,
  ticket_price: Decimal,
  collected_xrd: Vault,
 }

 impl ScryptoNFT {
   pub fn instantiate_scrypto_nft(nft_price: Decimal) -> ComponentAddress {
      // Prepare ticket NFT data
      let mut tickets = Vec::new();
      for row in 1..5 {
          for column in 1..5 {
              tickets.push((NonFungibleId::random(), Ticket { row, column }));
          }
      }

    let scrypto_nfts: Bucket = ResourceBuilder::new_non_fungible()
         .metadata("name", "Scrypto NFT Tickets")
         .initial_supply(tickets);

     Self {
      available_tickets: Vault::with_bucket(scrypto_nfts),
      ticket_price: nft_price,
      collected_xrd: Vault::new(RADIX_TOKEN),
     }
     .instantiate()
     .globalize()
   }

   pub fn buy_nft_ticket(&mut self, mut payment: Bucket) -> (Bucket, Bucket) {
      self.collected_xrd.put(payment.take(self.ticket_price));
      let nft_ticket  = self.available_tickets.take(1);

      (nft_ticket, payment)
   }

   pub fn available_nft_ids(&self) -> BTreeSet<NonFungibleId> {
    self.available_tickets.non_fungible_ids()
   }
 }
}
