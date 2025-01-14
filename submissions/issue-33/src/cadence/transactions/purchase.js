export const purchaseTx = `

import MyNFT from 0xf2011014fb9bee77
import NonFungibleToken from 0x631e88ae7f1d7c20
import FlowToken from 0x7e60df042a9c0868
import NFTMarketplace from 0xf2011014fb9bee77

transaction(account: Address, id: UInt64) {

  prepare(acct: AuthAccount) {
    let saleCollection = getAccount(account).getCapability(/public/MySaleCollection)
                            .borrow<&NFTMarketplace.SaleCollection{NFTMarketplace.SaleCollectionPublic}>()
                            ?? panic("could not borrow the user's salecollection")
    let recipientCollection = getAccount(acct.address).getCapability(/public/MyNFTCollection)
                            .borrow<&MyNFT.Collection{MyNFT.CollectionPublic, NonFungibleToken.CollectionPublic}>()
                            ?? panic("Cannot get the user's collection")
    
    let price = saleCollection.getPrice(id: id)

    let payment <- acct.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)!.withdraw(amount: price) as! @FlowToken.Vault
    
    saleCollection.purchase(id: id, recipientCollection: recipientCollection, payment: <- payment)
  }

  execute {
    log("A user purchased an NFT")
  }
}

`