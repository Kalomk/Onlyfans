import { useRouter, useSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import UserHeaderProfile from '../../Components/UserHeaderProfile/UserHeaderProfile';
import { Post } from '../../src/models';
import UserPosts from '../../Components/UserPosts/UserPosts';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { DataStore } from 'aws-amplify';
import { User } from '../../src/models';

const UserPage = () => {
  const router = useRouter();
  const { id } = useSearchParams();
  const [users, setUsers] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    DataStore.query(User, id).then((users) => setUsers(users));
    DataStore.query(Post,(post) => post.userID.eq(id)).then((post) => setPosts(post));

  }, [id]);

  if (!isSubscribed) {
    return (
      <View>
        <UserHeaderProfile
          users={users}
          isSubscribed={isSubscribed}
          setIsSubscribed={setIsSubscribed}
          router={router}
          id={id}
        />
        <View
          style={{
            backgroundColor: 'gainsboro',
            padding: 20,
            alignItems: 'center',
          }}
        >
          <FontAwesome5 name="lock" size={50} color="black" />
          <Text
            style={{
              backgroundColor: 'royalblue',
              padding: 15,
              borderRadius: 25,
              margin: 20,
              color: 'white',
              overflow: 'hidden',
            }}
          >
            Subscribe to see user content!
          </Text>
        </View>
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <UserPosts user={users} post={item} />}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <UserHeaderProfile
          users={users}
          isSubscribed={isSubscribed}
          setIsSubscribed={setIsSubscribed}
          router={router}
          id={id}
        />
      }
    />
  );
};

export default UserPage;
