import { View, Text, ImageBackground, StyleSheet, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';

const UserHeaderProfile = ({ users, isSubscribed, setIsSubscribed, router }) => {
  if (!users) {
    return <Text style={{ marginTop: 100 }}>User not found</Text>;
  }

  return (
    <View>
      <ImageBackground source={{ uri: users?.coverImage }} style={styles.ImageBackground}>
        <View style={styles.overlay} />
        <SafeAreaView style={{ marginHorizontal: 10 }}>
          <Ionicons onPress={() => router.back()} name="arrow-back" size={24} color="white" />
        </SafeAreaView>
        <Text
          style={{
            color: 'white',
            textFont: 22,
            fontWeight: 'bold',
            paddingHorizontal: 20,
          }}
        >
          Likes:1156 Posts:506 Subscribers:2065
        </Text>
      </ImageBackground>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          padding: 10,
          marginTop: -50,
        }}
      >
        <Image src={users?.avatar} style={styles.userImg}></Image>
        <FontAwesome name="share-square-o" size={24} color="royalblue" />
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 32, fontWeight: 600 }}>{users?.name}</Text>
        <Text style={{ fontSize: 22, color: 'grey', marginBottom: 10 }}>@{users?.handle}</Text>
        <Text style={{ fontSize: 15, lineHeight: 20, marginBottom: 30 }} numberOfLines={5}>
          {users?.bio}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: 600, color: 'grey', marginBottom: 20 }}>
          SUBSCRIPTION
        </Text>
      </View>
      <View style={{ paddingHorizontal: 15, marginBottom: 20 }}>
        <Pressable
          style={[styles.button, { backgroundColor: isSubscribed ? 'royalblue' : 'white' }]}
          onPress={() => setIsSubscribed(!isSubscribed)}
        >
          <Text style={[styles.buttonText, { color: isSubscribed ? 'white' : 'royalblue' }]}>
            {isSubscribed ? 'SUBSCRIBED' : 'SUBSCRIBE'}
          </Text>
          <Text style={[styles.buttonText, { color: isSubscribed ? 'white' : 'royalblue' }]}>
            {users.subscriptionPrice === 0
              ? 'FOR FREE'
              : `$${users.subscriptionPrice?.toFixed(2)}/month`}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    ...StyleSheet.absoluteFillObject,
  },
  ImageBackground: {
    height: 200,
    width: '100%',
  },
  userImg: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'white',
    marginRight: 20,
  },
  buttonText: {
    color: 'royalblue',
    fontWeight: 600,
  },
  button: {
    flexDirection: 'row',
    borderRadius: 50,
    borderColor: 'grey',
    paddingHorizontal: 20,
    padding: 15,
    justifyContent: 'space-between',
    borderWidth: 1,
    marginVertical: 10,
  },
});

export default UserHeaderProfile;
