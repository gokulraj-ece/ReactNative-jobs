import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends Component {
  static navigationOptions = { // class property - dont have access to props
    title: 'Review Jobs',
    tabBar: {
      icon: ({ tintColor }) => {
        return <Icon name="favorite" size={30} color={tintColor} />;
      }
    },
    header: ({ navigate }) => {
      return {
        right: (
          <Button
            title="Settings"
            onPress={() => navigate('settings')}
            backgroundColor="rgba(0,0,0,0)"
            color="rgba(0,122,255,1)"
          />
        ),
        style: {
          marginTop: Platform.OS === 'android' ? 24 : 0
        }
      };
    }
  } // to customize the route, used by the navigator

  renderLikedJobs() {
    return this.props.likes.map((job) => {
      const {
        company, formattedRelativeTime, url, longitude, latitude, jobtitle, jobkey
      } = job;
      const initialRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.02
      };
      return (
        <Card title={jobtitle} key={jobkey}>
          <View style={{ height: 200 }}>
            <MapView
              scrollEnabled={false}
              style={{ flex: 1 }}
              cacheEnabled={Platform.OS === 'android'}
              initialRegion={initialRegion}
            />
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{company}</Text>
              <Text style={styles.italics}>{formattedRelativeTime}</Text>
            </View>
            <Button
              title="Apply Now!"
              backgroundColor="#03A9F4"
              onPress={() => Linking.openURL(url)}
            />
          </View>
        </Card>
      );
    });
  }

  render() {
    return (
      <ScrollView>
        {this.renderLikedJobs()}
      </ScrollView>
    );
  }
}

const styles = {
  detailWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  italics: {
    fontStyle: 'italic'
  }
}

const mapStateToProps = ({ likes }) => {
  return {
    likes
  };
}

export default connect(mapStateToProps)(ReviewScreen);
