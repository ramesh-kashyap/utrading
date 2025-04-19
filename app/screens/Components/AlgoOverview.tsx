import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../../layout/Header';

const AlgoOverview = () => {
  return (
    <ScrollView style={styles.container}>
         <Header
                title='Information'
                leftIcon='back'
            />
      <View style={styles.card}>
        <Text style={styles.heading}>Algo Overview</Text>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Pair | USDM</Text>
            <Text style={styles.value}>ETHUSDT</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>AUM</Text>
            <Text style={styles.value}>145.11K USDT</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Trade Volume</Text>
            <Text style={styles.value}>3.76M USDT</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Draw Down</Text>
            <Text style={styles.value}>39.9% | 14.4%</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Time to Recovery</Text>
            <Text style={styles.value}>53d | 21.5d</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>No of Trade</Text>
            <Text style={styles.value}>33</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Win Rate</Text>
            <Text style={styles.value}>54.55%</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Profit Comm.</Text>
            <Text style={styles.value}>30%</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Time b/w Trades</Text>
            <Text style={styles.value}>25.38 d | 7.16 d</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D', // 🔥 change screen background to dark
    padding: 10,
  },
  card: {
    backgroundColor: '#1A1A1A', // 🔥 card background dark
    borderRadius: 10,
    padding: 15,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  column: {
    flex: 1,
  },
  label: {
    color: '#CCCCCC',
    fontSize: 12,
  },
  value: {
    color: '#80FF00', // 💡 Adjust this to match your template highlight
    fontSize: 14,
    fontWeight: '600',
  },
});

export default AlgoOverview;
