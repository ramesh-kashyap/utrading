import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { IMAGES } from '../../constants/Images';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import CoinSheet from '../../components/BottomSheet/CoinSheet';

type Props = {
  colors: any;
  type: string; // Accepts "spot" or "future"
};

const CoinDropDown = ({ colors, type }: Props) => {
  // Set initial coin data based on the passed type.
  // For "spot", we use Bitcoin demo data;
  // for "future", we use Ethereum demo data.
  const initialCoinData =
    type === 'spot'
      ? {
          image: IMAGES.bitcoin, // Ensure IMAGES.bitcoin exists in your assets
          name: 'Bitcoin',
          tag: 'BTC',
          balance: '$8,456.87',
          amount: '0.154836',
          rate: '+4.2',
        }
      : {
          image: IMAGES.ethereum, // Ensure you have an Ethereum image in your IMAGES constant
          name: 'Ethereum',
          tag: 'ETH',
          balance: '$12,345.67',
          amount: '1.234567',
          rate: '+3.5',
        };

  const [modalShow, setModal] = useState<boolean>(false);
  const [coinData, setCoinData] = useState<any>(initialCoinData);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModal(true)}
        activeOpacity={0.8}
        style={[styles.button, { backgroundColor: colors.input, borderColor: colors.border }]}
      >
        <View style={[styles.imageContainer, { backgroundColor: colors.card }]}>
          <Image style={[styles.image, { tintColor: colors.title }]} source={coinData.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[FONTS.h6, FONTS.fontSemiBold, { color: colors.title }]}>
            {coinData.name}
          </Text>
          <Text style={[FONTS.fontXs, FONTS.fontBaseMedium, { color: colors.text }]}>
            {coinData.tag}
          </Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={[FONTS.fontXs, FONTS.fontBaseMedium, { color: colors.text }]}>
            {coinData.amount}
          </Text>
        </View>
        <View style={styles.balanceContainer}>
          <Text style={[FONTS.h6, FONTS.fontBaseSemiBold, { color: colors.title }]}>
            {coinData.balance}
          </Text>
          <Text style={[FONTS.fontXs, { color: coinData.rate > 0 ? COLORS.success : COLORS.danger }]}>
            {coinData.rate}%
          </Text>
        </View>
        <Feather size={22} color={colors.text} name="pause-circle" />
      </TouchableOpacity>

      {/* Uncomment the block below to enable the CoinSheet modal */}
      {/*
      <CoinSheet
        modal={modalShow}
        setModal={setModal}
        setCoinData={setCoinData}
      />
      */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: -8,
    marginTop: -8,
    marginBottom: 20,
  },
  button: {
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
  },
  imageContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  image: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
  },
  amountContainer: {
    flex: 1,
  },
  balanceContainer: {
    marginRight: 12,
    alignItems: 'flex-end',
  },
});

export default CoinDropDown;
