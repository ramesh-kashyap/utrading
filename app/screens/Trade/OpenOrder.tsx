import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, FlatList, RefreshControl } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SIZES, FONTS, COLORS } from '../../constants/theme';
import Api from '../../../services/Api';
import { IMAGES } from '../../constants/Images';

// --- Coin list from your JSON data ---
const coinList = [
  {"id":"1","name":"Bitcoin","symbol":"btc","rank":"1","price":"93407.00000000","market_cap":"1850935549641.00","volume_24h":"60817235470.00","change_24h":"-1.91","created_at":"2025-01-09 17:41:22"},
  {"id":"2","name":"Ethereum","symbol":"eth","rank":"2","price":"3299.02000000","market_cap":"397741992416.00","volume_24h":"31857580988.00","change_24h":"-1.65","created_at":"2025-01-09 17:41:22"},
  {"id":"4","name":"XRP","symbol":"xrp","rank":"4","price":"2.30000000","market_cap":"132138509990.00","volume_24h":"7116770900.00","change_24h":"-1.11","created_at":"2025-01-09 17:41:22"},
  {"id":"5","name":"BNB","symbol":"bnb","rank":"5","price":"699.56000000","market_cap":"102033827220.00","volume_24h":"1140696478.00","change_24h":"0.36","created_at":"2025-01-09 17:41:22"},
  {"id":"6","name":"Solana","symbol":"sol","rank":"6","price":"190.99000000","market_cap":"92372953515.00","volume_24h":"4814109945.00","change_24h":"-2.46","created_at":"2025-01-09 17:41:22"},
  {"id":"7","name":"Dogecoin","symbol":"doge","rank":"7","price":"0.32999300","market_cap":"48726203923.00","volume_24h":"4070672482.00","change_24h":"-4.97","created_at":"2025-01-09 17:41:22"},
  {"id":"9","name":"Cardano","symbol":"ada","rank":"9","price":"0.90985000","market_cap":"32610265452.00","volume_24h":"1823890180.00","change_24h":"-7.58","created_at":"2025-01-09 17:41:22"},
  {"id":"11","name":"TRON","symbol":"trx","rank":"11","price":"0.24450500","market_cap":"21083973384.00","volume_24h":"1279157514.00","change_24h":"-1.90","created_at":"2025-01-09 17:41:22"},
  {"id":"12","name":"Avalanche","symbol":"avax","rank":"12","price":"36.69000000","market_cap":"15055376095.00","volume_24h":"476416991.00","change_24h":"-3.83","created_at":"2025-01-09 17:41:22"},
  {"id":"13","name":"Sui","symbol":"sui","rank":"14","price":"4.61000000","market_cap":"13841190451.00","volume_24h":"1005791328.00","change_24h":"1.22","created_at":"2025-01-09 17:41:22"},
  {"id":"15","name":"Toncoin","symbol":"ton","rank":"15","price":"5.22000000","market_cap":"13272617154.00","volume_24h":"286601514.00","change_24h":"-0.39","created_at":"2025-01-09 17:41:22"},
  {"id":"16","name":"Chainlink","symbol":"link","rank":"16","price":"19.92000000","market_cap":"12580933418.00","volume_24h":"1045755016.00","change_24h":"-4.05","created_at":"2025-01-09 17:41:22"},
  {"id":"17","name":"Shiba Inu","symbol":"shib","rank":"17","price":"0.00002110","market_cap":"12428991766.00","volume_24h":"558423836.00","change_24h":"-2.02","created_at":"2025-01-09 17:41:22"},
  {"id":"18","name":"Wrapped Bitcoin","symbol":"wbtc","rank":"18","price":"93429.00000000","market_cap":"12332327035.00","volume_24h":"546510032.00","change_24h":"-1.73","created_at":"2025-01-09 17:41:22"},
  {"id":"19","name":"Stellar","symbol":"xlm","rank":"19","price":"0.40011500","market_cap":"12156527432.00","volume_24h":"712928121.00","change_24h":"-6.19","created_at":"2025-01-09 17:41:22"},
  {"id":"20","name":"Hedera","symbol":"hbar","rank":"20","price":"0.27085500","market_cap":"10363038427.00","volume_24h":"638087007.00","change_24h":"-3.12","created_at":"2025-01-09 17:41:22"},
  {"id":"21","name":"Polkadot","symbol":"dot","rank":"21","price":"6.67000000","market_cap":"10155123836.00","volume_24h":"418384780.00","change_24h":"-2.81","created_at":"2025-01-09 17:41:22"},
  {"id":"23","name":"Bitcoin Cash","symbol":"bch","rank":"23","price":"426.48000000","market_cap":"8451564034.00","volume_24h":"260192029.00","change_24h":"-1.62","created_at":"2025-01-09 17:41:22"},
  {"id":"25","name":"Litecoin","symbol":"ltc","rank":"25","price":"103.75000000","market_cap":"7816764794.00","volume_24h":"676733266.00","change_24h":"1.49","created_at":"2025-01-09 17:41:22"}
];

// --- Component Props ---
type Props = {
  colors: any;
  type: string; // e.g., "spot" or "future"
};

const OpenOrder = ({ colors, type }: Props) => {
  const [activeTrades, setActiveTrades] = useState<any[]>([]);
  const [totalAmounts, setTotalAmounts] = useState<{ [key: string]: string | number }>({});
  const [totalPnl, setTotalPnl] = useState<number>(0);
  const [totalPnlPercentage, setTotalPnlPercentage] = useState<number>(0);
  const [refreshing, setRefreshing] = useState(false);

  // Fallback coin data (if needed)
  const coinData = {
    image: IMAGES.bitcoin,
    name: 'Bitcoin',
    tag: 'BTC',
    balance: '$8,456.87',
    amount: '0.154836',
    rate: '+4.2',
  };

  // Helper function: extract coin code from order symbol (e.g., "BTCUSDT" -> "btc")
  const getCoinCode = (orderSymbol: string): string => {
    if (!orderSymbol) return 'btc';
    const code = orderSymbol.replace('USDT', '').toLowerCase();
    const coin = coinList.find(c => c.symbol === code);
    return coin ? coin.symbol : 'btc';
  };

  // Mapping for Feather icons (customize as needed)
  const featherCoinIcons: { [key: string]: string } = {
    btc: "dollar-sign",
    eth: "cpu",
    xrp: "activity",
    bnb: "briefcase",
    sol: "sun",
    doge: "smile",
    ada: "activity",
    trx: "git-branch",
    avax: "cloud",
    sui: "hexagon",
    ton: "circle",
    link: "link",
    shib: "trending-down",
    wbtc: "dollar-sign",
    xlm: "star",
    hbar: "hexagon",
    dot: "circle",
    bch: "dollar-sign",
    ltc: "dollar-sign",
  };

  const getFeatherIconName = (coinCode: string): string => {
    return featherCoinIcons[coinCode] || "dollar-sign";
  };

  // Helper: Get coin icon URL from CoinCap
  const getCoinIconUrl = (symbol: string): string => {
    return `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;
  };

  // API call to fetch active trades with retry logic and exponential backoff
  const fetchActiveTrades = async (retryCount = 0) => {
    // setRefreshing(true);
    try {
      const response = await Api.get('/getActiveTrades', { params: { type } });
      // console.log('Response:', response);
      if (response.data.success) {
        setActiveTrades(response.data.activeTrades);
        setTotalPnl(response.data.totalOverallPnl);
        setTotalPnlPercentage(response.data.totalOverallPnlPercentage);
        if (response.data.sumActiveTradesByCoin) {
          const totalsObj: { [key: string]: string | number } = {};
          response.data.sumActiveTradesByCoin.forEach((item: any) => {
            totalsObj[item.coinCode] = item.totalAmount;
          });
          setTotalAmounts(totalsObj);
        }
      } else {
        console.log(response.data.message || 'Failed to load active trades');
      }
    } catch (err: any) {
      if (err.response && err.response.status === 429 && retryCount < 5) {
        const baseDelay = 2000; // base delay 2 seconds
        const retryAfterHeader = err.response.headers['retry-after'];
        const delay = retryAfterHeader
          ? parseInt(retryAfterHeader, 10) * 1000
          : baseDelay * Math.pow(2, retryCount); // exponential backoff: 2s, 4s, 8s, etc.
        console.warn(`Rate limit hit. Retrying in ${delay}ms (attempt ${retryCount + 1})...`);
        setTimeout(() => {
          fetchActiveTrades(retryCount + 1);
        }, delay);
      } else {
        console.error('Error fetching active trades:', err);
        Alert.alert('Error', 'Too many requests. Please try again later.');
      }
    } finally {
      setRefreshing(false);
    }
  };

  // Fetch trades whenever the market type changes
  // useEffect(() => {
  //   fetchActiveTrades();
  // }, [type]);
  // Polling for live data every 10 seconds
  useEffect(() => {
    fetchActiveTrades(); // initial fetch
    const intervalId = setInterval(() => {
      fetchActiveTrades();
    }, 1000); // every 10 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [type]);

  // Fallback sample orders (for testing or if API returns no data)
  const sampleOrders = [
    { image: IMAGES.bitcoin, type: "Buy", orderDate: "02-08-2022 5:30 pm", amount: "0.020000045", price: "294.70", orderType: "Limit order", market: "spot", symbol: "BTCUSDT" },
    { image: IMAGES.bitcoin, type: "Buy", orderDate: "02-08-2022 5:30 pm", amount: "0.015000030", price: "300.00", orderType: "Limit order", market: "spot", symbol: "BTCUSDT" },
    { image: IMAGES.bitcoin, type: "Sell", orderDate: "02-08-2022 6:00 pm", amount: "0.010000010", price: "310.50", orderType: "Market order", market: "future", symbol: "BTCUSDT" },
    { image: IMAGES.bitcoin, type: "Sell", orderDate: "02-08-2022 6:10 pm", amount: "0.005000005", price: "320.00", orderType: "Limit order", market: "future", symbol: "BTCUSDT" },
    { image: IMAGES.bitcoin, type: "Buy", orderDate: "02-08-2022 6:30 pm", amount: "0.025000050", price: "305.00", orderType: "Limit order", market: "spot", symbol: "BTCUSDT" },
  ];

  const dataToUse = activeTrades.length > 0 ? activeTrades : sampleOrders;

  // Filter orders by market type and active status (if available)
  const activeOrders = dataToUse.filter(order =>
    order.market === type && (order.tradeStatus ? order.tradeStatus === "active" : true)
  );

  // Sort orders by date (oldest first)
  const sortedActiveOrders = activeOrders.sort((a, b) => {
    const timeA = a.transact_time ? new Date(a.transact_time) : new Date(a.orderDate);
    const timeB = b.transact_time ? new Date(b.transact_time) : new Date(b.orderDate);
    return timeA.getTime() - timeB.getTime();
  });

  // Filter to get the oldest trade per coin (by normalized symbol)
  const uniqueOldestOrders = sortedActiveOrders.filter((order, index, self) =>
    index === self.findIndex(o => o.symbol.replace('USDT', '').toLowerCase() === order.symbol.replace('USDT', '').toLowerCase())
  );

  // Handle order press (e.g., cancel or sell order)
  const handleOrderPress = async (order: any) => {
    Alert.alert(
      "Sell Order",
      `Do you want to sell ${order.symbol}?`,
      [
        { text: "No", onPress: () => console.log("Sell Cancelled"), style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const response = await Api.post('/cancel-order', { symbol: order.symbol,  marketType: order.market || 'spot', });
              if (response.data.success) {
                Alert.alert("Success", `Sell order placed for ${order.symbol}`);
              } else {
                Alert.alert("Error", response.data.message || "Failed to sell");
              }
            } catch (error) {
              console.error("Sell Order Error:", error);
              Alert.alert("Error", "Something went wrong while selling.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Render each order item
  const renderOrderItem = ({ item }: { item: any }) => {
    const coinCode = item.symbol ? getCoinCode(item.symbol) : 'btc';
    const featherIconName = getFeatherIconName(coinCode);
    const totalForCoin = totalAmounts[coinCode] ? totalAmounts[coinCode] : item.amount;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {}}
          activeOpacity={0.8}
          style={[styles.button, { backgroundColor: colors.input, borderColor: colors.border }]}
        >
          
          {
  item.market === 'future' ? (
   
    item.side === 'BUY'
    ? <View style={[styles.imageContainer, { backgroundColor: 'green' , justifyContent: 'center', alignItems: 'center'}]}> <Text style={[FONTS.h6, FONTS.fontSemiBold, { color: 'white' ,fontSize:12}]}>
    B
  </Text>
  </View>
    : <View style={[styles.imageContainer, { backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }]}><Text style={[FONTS.h6, FONTS.fontSemiBold, { color: 'white' ,fontSize:12}]}>
    S
  </Text></View>

  ) : (
    <View style={[styles.imageContainer, { backgroundColor: colors.card }]}>
    <Image
      source={{ uri: getCoinIconUrl(coinCode) }}
      style={{ width: 30, height: 30, resizeMode: 'contain' }}
    />
    </View>
  )
}
          
          <View style={styles.textContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Text style={[FONTS.h6, FONTS.fontSemiBold, { color: colors.title ,fontSize: 14 }]}>
      {item.symbol || coinData.name}
    </Text>
    {item.market === 'future' && (
      <Text style={[FONTS.fontXs, FONTS.fontBaseMedium, { color: colors.text, marginLeft: 4 ,fontSize: 8}]}>
        {Number(item.leverage)}X
      </Text>
    )}
  </View>
            <Text style={[FONTS.fontXs, FONTS.fontBaseMedium, { color: colors.text,fontSize: 14 ,paddingTop: 5}]}>${item.realPrice}</Text>
          </View>
          <View style={styles.amountContainer}>
  {item.market === 'future' && (
  <View style={{ alignItems: 'center' }}>
  <Text style={[FONTS.fontXs, FONTS.fontBaseMedium, { color: colors.text, fontSize: 9 }]}>
    Margin USDT: {item.coinStats.totalAmount}
  </Text>
  <Text style={[FONTS.fontXs, FONTS.fontBaseMedium, { color: colors.text, fontSize: 9 }]}>
    Entry Price: ${Number(item.price).toFixed(4)}
  </Text>
</View>
  )}
  {item.market === 'spot' && (
    <>
      <Text style={[FONTS.fontXs, FONTS.fontBaseMedium, { color: colors.text }]}>
        Order Price: ${Number(item.price).toFixed(4)}
      </Text>
    </>
  )}
</View>
<View style={styles.balanceContainer}>
  <Text
    style={[
      FONTS.h6,
      FONTS.fontBaseSemiBold,
      { fontSize: 14,color: item.coinStats && item.coinStats.pnl >= 0 ? COLORS.success : COLORS.danger }
    ]}
  >
    ${item.coinStats ? Number(item.coinStats.pnl).toFixed(2) : '0.00'}
  </Text>
  <Text
    style={[
      FONTS.fontXs,
      FONTS.fontBaseSemiBold,
      { fontSize: 8,color: item.coinStats && item.coinStats.pnlPercentage >= 0 ? COLORS.success : COLORS.danger }
    ]}
  >
    {item.coinStats ? Number(item.coinStats.pnlPercentage).toFixed(2) : '0.00'}%
  </Text>
</View>

          <Feather size={22} color={colors.text} onPress={() => handleOrderPress(item)} name="pause-circle" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ marginHorizontal: 2, marginTop: 8 }}>
      {uniqueOldestOrders.length > 0 ? (
        <FlatList
          data={uniqueOldestOrders}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderOrderItem}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchActiveTrades} />}
        />
      ) : (
        <Text style={[FONTS.fontSm, { color: colors.text, textAlign: 'center', marginTop: 20 }]}>
          No orders available for {type} market.
        </Text>
      )}
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
    height: 30,
    width: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  amountContainer: {
    flex: 2,
    alignItems: 'center'
  },
  balanceContainer: {
    marginRight: 12,
    alignItems: 'flex-end',
  },
});

export default OpenOrder;
