import React from 'react';
import { View } from 'react-native';
import WalletList from '../../components/List/WalletList';
import { IMAGES } from '../../constants/Images';

const gainersData = [
    {
        image : IMAGES.bitcoin,
        name : 'Bitcoin',
        tag : 'BTC',
        balance : '$8,456.87',
        amount : '0.154836',
        rate : '+4.2',
    },
    {
        image : IMAGES.ethereum,
        name : 'Ethereum',
        tag : 'BTC',
        balance : '$8,456.87',
        amount : '0.154836',
        rate : '+1.5',
    },
    {
        image : IMAGES.ripple,
        name : 'Ripple',
        tag : 'BTC',
        balance : '$8,456.87',
        amount : '0.154836',
        rate : '+4.1',
    },
    {
        image : IMAGES.bitcoin,
        name : 'Bitcoin',
        tag : 'BTC',
        balance : '$8,456.87',
        amount : '0.154836',
        rate : '+3.2',
    },
]

const TopGainers = () => {
    return (
        <View>
            {gainersData.map((data , index) => {
                return(
                    <WalletList
                        image={data.image}
                        name={data.name}
                        tag={data.tag}
                        balance={data.balance}
                        amount={data.amount}
                        rate={data.rate}
                        key={index}
                    />
                )
            })}
        </View>
    )
}

export default TopGainers;