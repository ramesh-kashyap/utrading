import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // 👈 Add this
import Header from '../../layout/Header';
import Api from "../../../services/Api";

export default function PhoenixCard() {
  
  
  const navigation = useNavigation(); // 👈 Hook for navigation
  const [botData, setBotData] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);


  const getInfo = async () => {
    setLoading(true);
    try {
        const response = await Api.get("/future-bot");
        if (response.data.success) {
          setBotData(response.data.bots); // ✅ updated based on response key
        } else {
          console.error('Error fetching future bots:', error);

          setMessage(response.data.message || 'No data found');
        }
    } catch (error) {
    console.error('Error fetching future bots:', error);
        setMessage('Failed to load bots');
    }
    finally {
        setLoading(false); // Ensure UI updates after fetching
    }
};


   useEffect(()=>{
    getInfo();
   },[]);
 
  
  return (
    
    <ScrollView style={styles.container}>
      
       <Header
                title='Strategy'
                leftIcon='back'
            />


{botData.length === 0 ? (
  <Text style={{ color: '#fff', textAlign: 'center', marginTop: 20 }}>No data found</Text>
) : (
    botData.map((bot) => (

            
 <TouchableOpacity onPress={() => {
                
                navigation.navigate('AlgoOverview'); // 👈 Navigate to your bot page
              }} >
    <View style={styles.card} >
      {/* Top header */}
      <View style={styles.header}>
        <Text style={styles.title}>{bot.coin_name}-{bot.leverage}X</Text>

        <View style={styles.badges}>
          <Text style={styles.futuresBadge}>Futures</Text>
          <Text style={styles.coinmBadge}>COINm</Text>
        </View>
      </View>

      {/* Sub info */}
      <View style={styles.subHeader}>
        <Text style={styles.subText}>{bot.coin_name} | 139 Followers</Text>
        <Text style={styles.leverage}>{bot.leverage}x Leverage</Text>
      </View>

      {/* ROI Section */}
      <View style={styles.roiTabs}>
        <View style={styles.roiRow}>
          <ROIBox label="3M" value="-12.79%" positive={false} />
          <ROIBox label="6M" value="41.15%" />
          <ROIBox label="1Y" value="116.56%" />
        </View>
        <View style={styles.roiRow}>
          <ROIBox label="2Y" value="318.38%" />
          <ROIBox label="3Y" value="5.65%" />
          <ROIBox label="4Y" value="33.78%" />
        </View>
      </View>

      {/* ROI + AUM */}
      <View style={styles.stats}>
        <Text style={styles.annualRoi}>+116.56%</Text>
        <View style={styles.aumBox}>
          <Text style={styles.aumValue}>{bot.amount} USDT</Text>
          <Text style={styles.aumLabel}>AUM (ETH)</Text>
        </View>
      </View>

      {/* Graph Image Placeholder */}
      <View style={styles.graphBox}>
      <Image
  source={require('../../assets/images/chart.png')}
  style={styles.graphImage}
  resizeMode="contain"
/>

      </View>

      {/* Follow Button */}
      <TouchableOpacity
  style={styles.followButton}
  onPress={async () => {
    try {
      const response = await Api.post("/submit-pending-bot", {
        coin_name: bot.coin_name,
        amount: bot.amount,
        leverage: bot.leverage,
      });

      if (response.data.success) {
        navigation.navigate("RuningBot"); // 👈 redirect to "Running Bot" screen

      } else {
        alert(response.data.message || "Failed to follow bot.");
      }
    } catch (err) {
      console.error(err);
      alert("Error following bot.");
    }
  }}
>
  <Text style={styles.followText}>Follow</Text>
</TouchableOpacity>

    </View>
    </TouchableOpacity>
   ))
  )}
      
    </ScrollView>

  );
}

function ROIBox({ label, value, positive = true }) {
  return (
    <View style={styles.roiBox}>
      <Text style={styles.roiLabel}>{label}</Text>
      <Text style={[styles.roiValue, { color: positive ? '#28a745' : '#dc3545' }]}>
        {value}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({

    card: {
      backgroundColor: '#121212',
      borderRadius: 12,
      padding: 16,
      margin: 16,
      elevation: 5,
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
      container: {
    flex: 1,
    backgroundColor: '#000', // 🔥 Change background here
  },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff'
    },
    badges: {
      flexDirection: 'row',
      gap: 6
    },
    futuresBadge: {
      backgroundColor: '#00FF84',
      color: '#000',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
      fontSize: 12
    },
    coinmBadge: {
      backgroundColor: '#FFB703',
      color: '#000',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
      fontSize: 12
    },
    subHeader: {
      marginTop: 4,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    subText: {
      fontSize: 12,
      color: '#aaa'
    },
    leverage: {
      backgroundColor: '#1e1e1e',
      paddingHorizontal: 8,
      borderRadius: 4,
      fontSize: 12,
      color: '#00FF84'
    },
    roiTabs: {
      marginTop: 12
    },
    roiRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8
    },
    roiBox: {
      width: '30%',
      backgroundColor: '#1e1e1e',
      padding: 6,
      borderRadius: 6,
      alignItems: 'center'
    },
    roiLabel: {
      fontSize: 12,
      color: '#bbb'
    },
    roiValue: {
      fontSize: 14,
      fontWeight: 'bold'
    },
    stats: {
      marginTop: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    annualRoi: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#00FF84'
    },
    aumBox: {
      alignItems: 'flex-end'
    },
    aumValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff'
    },
    aumLabel: {
      fontSize: 12,
      color: '#aaa'
    },
    graphBox: {
      marginTop: 10,
      alignItems: 'center',
      height: 100
    },
    graphImage: {
      width: '100%',
      height: '100%'
    },
    followButton: {
      marginTop: 12,
      backgroundColor: '#00FF84',
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: 'center'
    },
    followText: {
      color: '#000',
      fontSize: 16,
      fontWeight: 'bold'
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    popupBox: {
      backgroundColor: '#1e1e1e',
      padding: 20,
      borderRadius: 12,
      width: '80%',
      shadowColor: '#000',
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 10,
    },
    
    popupTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#00FF84',
      marginBottom: 16,
      textAlign: 'center',
    },
    
    input: {
      backgroundColor: '#2c2c2c',
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 8,
      color: '#fff',
      marginBottom: 12,
      fontSize: 14,
    },
    
    popupActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    
    cancelButton: {
      backgroundColor: '#444',
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
    
    cancelText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    
    confirmButton: {
      backgroundColor: '#00FF84',
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
    
    confirmText: {
      color: '#000',
      fontWeight: 'bold',
    }
    
    
    
  });
  