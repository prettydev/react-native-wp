import React, { memo } from 'react';
import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const height = Math.round(Dimensions.get('window').height);
const ratio = height/900;

const MissionCard = ({missionType, points, kills}) => {
  return (
  <TouchableOpacity style={styles.back} activeOpacity={.7}>
      <Text style={styles.missionType}>{missionType}</Text>
      <Text style={styles.missionType}>Assassinations</Text>
      <Text style={styles.points}>{points}</Text>
      <View style={styles.kills}>
          <Image source={require('../assets/skull.png')}></Image>
          <Text style={styles.num_kills}>{kills}</Text>
      </View>
  </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  num_kills:{
    fontSize: 15 * ratio,
    color: 'white',
    fontWeight: '500'
  },
  kills:{
    backgroundColor: 'black',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 30 * ratio,
    height: 30 * ratio,
    paddingHorizontal: 10 * ratio,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  points:{
    fontSize: 30 * ratio,
    fontWeight: 'bold',
    color: "#ffffff"
  },
  missionType:{
    fontSize: 15 * ratio,
    color: 'rgba(255, 255, 255, .7)'
  },
  back: {
    width: 146 * ratio,
    height: 135 * ratio,
    borderRadius: 18 * ratio,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10 * ratio
  },
});

export default memo(MissionCard);
