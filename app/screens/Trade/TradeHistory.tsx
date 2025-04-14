import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { SIZES, FONTS, COLORS } from '../../constants/theme';
import Api from '../../../services/Api'; // Ensure correct API import

type Props = {
  colors: any;
  type: string; // Can be "spot" or "future"
};

const TradeHistory = ({ colors, type }: Props) => {
  const [tradeHistory, setTradeHistory] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const marketType=type;
  // ✅ Fetch trade history from API
  const fetchTradeHistory = async () => {
  
    try {
      setRefreshing(true);
      console.log('Type:',type);
      const response = await Api.get('/getClosedTrades', { params: { marketType: type } }); // Replace with actual endpoint
      console.log('response:',response.data.closedTrades);
      if (response.data.success) {
        setTradeHistory(response.data.closedTrades || []);
      } else {
        console.error('Error fetching trade history:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching trade history:', error);
    } finally {
      setRefreshing(false);
    }
  };

  // ✅ Pull-to-refresh function
  const onRefresh = useCallback(() => {
    fetchTradeHistory();
  }, []);

  // ✅ Fetch data when component mounts
  useEffect(() => {
    fetchTradeHistory();
  }, []);

  // ✅ Filter orders based on type (spot/future)
  const filteredOrders = tradeHistory.filter((order) => order.market === type);

  // ✅ Render each order item
  const renderItem = ({ item }: { item: any }) => (
    <View style={[styles.orderContainer, { backgroundColor: colors.card }]}>
      <View style={styles.listRow}>
        <Text style={[FONTS.h5, FONTS.fontBaseMedium, { color: COLORS.primary, flex: 1 }]}>
          {item.symbol}
        </Text>
        <Text style={[FONTS.font, { color: COLORS.danger }]}>Cancel</Text>
      </View>
      <View style={styles.listRow}>
        <Text style={[FONTS.font, FONTS.fontBaseMedium, { color: colors.title, flex: 1 }]}>Order Date</Text>
        <Text style={[FONTS.fontXs, { color: colors.text }]}>{item.updated_at}</Text>
      </View>
      <View style={styles.listRow}>
        <Text style={[styles.labelText, { color: colors.text }]}>Amount</Text>
        <Text style={[styles.dataText, { color: colors.title }]}>{item.amount}</Text>
      </View>
      <View style={styles.listRow}>
        <Text style={[styles.labelText, { color: colors.text }]}>Price</Text>
        <Text style={[styles.dataText, { color: colors.title }]}>{item.price}</Text>
      </View>
      <View style={styles.listRow}>
        <Text style={[styles.labelText, { color: colors.text }]}>Order Type</Text>
        <Text style={[styles.dataText, { color: colors.title }]}>{item.order_type}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={filteredOrders}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      nestedScrollEnabled={true} // ✅ Enables smooth scrolling inside another scrollable view
      ListEmptyComponent={
        <Text style={[FONTS.fontSm, { color: colors.text, textAlign: 'center', marginTop: 20 }]}>
          No orders available for {type} market.
        </Text>
      }
      
    />
  );
};

// ✅ Styles for the component
const styles = StyleSheet.create({
  orderContainer: {
    marginBottom: 8,
    borderRadius: SIZES.radius,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 1,
  },
  labelText: {
    flex: 1,
    ...FONTS.fontSm,
  },
  dataText: {
    ...FONTS.fontSm,
    ...FONTS.fontBaseMedium,
  },
  headerText: {
    ...FONTS.h5,
    color: COLORS.primary,
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default TradeHistory;
