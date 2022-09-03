import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { useWeb3ReactModal } from '@bitiumagency/web3-react-modal';
import { abi, contractAddress } from './abi'


const Mint = () => {
    const { connect } = useWeb3ReactModal()
    const { active, account, library } = useWeb3React()
    const [NFTContract, setNFTContract] = useState()
    const [mintPrice, setMintPrice] = useState()

    useEffect(() => {
        if (library) {
            setNFTContract(new ethers.Contract(contractAddress, abi, library.getSigner()))
        }
    }, [library])


    const handleMint = async () => {
        const res = await NFTContract.mint(contractAddress, '1', { gasLimit: 50000 })
        console.log(res)
        const res2 = await NFTContract.mintPrice()
        console.log(parseInt(res2?._hex, 16))
        setMintPrice(parseInt(res2?._hex, 16));
    }



    return (
        <div className='container'>
            <div className='navBar'>
                <div className='logo'>
                    logo
                </div>
                <button className='connectButton' onClick={connect}>
                    connect wallet
                </button>
            </div>
            <div className='bodyContainer'>
                <div className='body1'>
                    <div className='preview-nft'>
                        <p>preview / nft</p>
                    </div>
                </div>
                <div className='body2'>
                    <div className='body2Container'>
                        <label className='body2Title'>LOREM IPSUM</label>
                        <label className='body2paragraph'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.
                        </label>
                        <div className='gridContainer'>
                            <div className='grid'>
                                <p>price</p>

                                {mintPrice}
                            </div>
                            <div className='grid'>
                                <p>Available</p>
                                <p>xx/xx</p>
                            </div>
                            <div className='grid'>
                                <p>Mints per wallet</p>
                                <p>...</p>
                            </div>
                            <div className='grid'>
                                <p>(Set number)</p>
                            </div>
                        </div>
                        <button className='mintButton' onClick={handleMint}>mint</button>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default Mint