//import SoulMadeComponent from "../../contracts/SoulMadeComponent.cdc"

// testnet
import SoulMadeComponent from 0xb4187e54e0ed55a8

pub fun main(address: Address) : Int {

    let receiverRef = getAccount(address)
                      .getCapability<&{SoulMadeComponent.CollectionPublic}>(SoulMadeComponent.CollectionPublicPath).borrow() ?? panic("Could not borrow the receiver reference")
        
    return receiverRef.getIDs().length

}
