import { StyleSheet, Text, View, Image, ImageBackground,Pressable } from 'react-native';
import {Link} from 'expo-router'

const UserCard = ({user}) => {
  return (
    <Link href={`/user/${user?.id}`} asChild>
   <Pressable>
   <ImageBackground source={{ uri: user?.coverImage }} style={styles.userCard}>
      <View style={styles.overlay} />
      <Image src={user?.avatar} style={styles.userImg}></Image>
      <View style={styles.textContainer}>
        <Text
          style={{
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
          }}
        >
          {user?.name}
        </Text>
        <Text
          style={{
            color: 'white',
            textFont: 22,
            fontWeight: 'bold',
          }}
        >
          @{user?.handle}
        </Text>
      </View>
    </ImageBackground>
   </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  userCard: {
    backgroundColor: 'grey',
    padding: 10,
    flexDirection: 'row',
    alingItems: 'flex-end',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  userImg: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'white',
    marginRight: 20,
  },
  textContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    ...StyleSheet.absoluteFillObject,
  },
});

export default UserCard;
